// ChatInterface.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
// Suppose you have a similar RTClient library from 'rt-client'
import { RTClient, RTInputAudioItem, RTResponse } from 'rt-client'; 
import { AudioHandler } from './AudioHandler'; 

interface Message {
  type: 'user' | 'assistant' | 'status';
  content: string;
}

const ChatInterface = () => {
  // Connection
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [isAzure, setIsAzure] = useState(false);
  const [deployment, setDeployment] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Conversation
  const [instructions, setInstructions] = useState('');
  const [useVAD, setUseVAD] = useState(true);
  const [temperature, setTemperature] = useState(0.9);
  const [modality, setModality] = useState<'text' | 'audio'>('audio');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Refs
  const clientRef = useRef<RTClient | null>(null);
  const audioHandlerRef = useRef<AudioHandler | null>(null);

  // Connect / Disconnect
  const handleConnect = async () => {
    if (isConnected) {
      await disconnect();
      return;
    }

    setIsConnecting(true);
    try {
      // For demonstration, we'll pretend your "rt-client" library in RN works similar to Next.js
      const c = isAzure
        ? new RTClient(new URL(endpoint), { key: apiKey }, { deployment })
        : new RTClient({ key: apiKey }, { model: 'gpt-4o-realtime-preview-2024-10-01' });

      // Configure client
      c.configure({
        instructions: instructions?.length ? instructions : undefined,
        input_audio_transcription: { model: 'whisper-1' },
        turn_detection: useVAD ? { type: 'server_vad' } : null,
        temperature,
        // In your Next.js code, you used `["text", "audio"]` for audio modality
        modalities: modality === 'audio' ? ['text', 'audio'] : ['text'],
        // tools: []  // Add if needed
      });

      clientRef.current = c;
      setIsConnected(true);
      addMessage('Connected!', 'status');
      startResponseListener(c);
    } catch (err) {
      console.error('Connection failed:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (clientRef.current) {
      try {
        await clientRef.current.close();
        clientRef.current = null;
      } catch (error) {
        console.error('Disconnect failed:', error);
      }
    }
    setIsConnected(false);
    addMessage('Disconnected.', 'status');
  };

  // Listen for server events
  const startResponseListener = async (client: RTClient) => {
    try {
      for await (const event of client.events()) {
        if (event.type === 'response') {
          await handleResponse(event);
        } else if (event.type === 'input_audio') {
          await handleInputAudio(event);
        }
      }
    } catch (error) {
      console.error('Response iteration error:', error);
    }
  };

  // Handle response items
  const handleResponse = async (response: RTResponse) => {
    for await (const item of response) {
      if (item.type === 'message' && item.role === 'assistant') {
        const newMsg: Message = { type: 'assistant', content: '' };
        setMessages((prev) => [...prev, newMsg]);

        for await (const content of item) {
          if (content.type === 'text') {
            // Stream text
            for await (const textChunk of content.textChunks()) {
              newMsg.content += textChunk;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...newMsg };
                return updated;
              });
            }
          } else if (content.type === 'audio') {
            // Stream transcripts + audio chunks
            const textTask = (async () => {
              for await (const t of content.transcriptChunks()) {
                newMsg.content += t;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...newMsg };
                  return updated;
                });
              }
            })();

            const audioTask = (async () => {
              // Start playback
              audioHandlerRef.current?.startStreamingPlayback();
              for await (const audioChunk of content.audioChunks()) {
                // audioChunk is typically a Uint8Array of PCM frames
                audioHandlerRef.current?.playChunk(audioChunk);
              }
            })();

            await Promise.all([textTask, audioTask]);
          }
        }
      }
    }
  };

  // Handle input_audio event
  const handleInputAudio = async (item: RTInputAudioItem) => {
    // Stop playback (if you want) and wait for item to complete
    audioHandlerRef.current?.stopStreamingPlayback();
    await item.waitForCompletion();

    // The server’s final transcript
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: item.transcription ?? '' },
    ]);
  };

  // Send text message
  const sendMessage = async () => {
    if (!currentMessage.trim() || !clientRef.current) return;
    // Add local user message
    addMessage(currentMessage, 'user');
    try {
      await clientRef.current.sendItem({
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text: currentMessage }],
      });
      await clientRef.current.generateResponse();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
    setCurrentMessage('');
  };

  // Toggle recording
  const toggleRecording = async () => {
    if (!clientRef.current) return;
    const audioHandler = audioHandlerRef.current;

    if (!audioHandler) return;

    if (!isRecording) {
      // Start
      try {
        await audioHandler.startRecording(async (chunk: Uint8Array) => {
          // Push chunk to server
          await clientRef.current?.sendAudio(chunk);
        });
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start recording:', err);
      }
    } else {
      // Stop
      try {
        await audioHandler.stopRecording();
        if (!useVAD) {
          // If no VAD, we manually tell server “we’re done”
          const inputAudioItem = await clientRef.current?.commitAudio();
          if (inputAudioItem) {
            await handleInputAudio(inputAudioItem);
            await clientRef.current?.generateResponse();
          }
        }
        setIsRecording(false);
      } catch (err) {
        console.error('Failed to stop recording:', err);
      }
    }
  };

  // Add message to state
  const addMessage = (content: string, type: 'user' | 'assistant' | 'status') => {
    setMessages((prev) => [...prev, { type, content }]);
  };

  // Lifecycle init/cleanup
  useEffect(() => {
    // Create AudioHandler
    const initAudioHandler = async () => {
      const handler = new AudioHandler();
      audioHandlerRef.current = handler;
      // no real "initialize" needed if you want to do it once user taps "Record"
      // but if your AudioHandler requires a separate init step, do it here
    };

    initAudioHandler().catch(console.error);

    return () => {
      disconnect();
      audioHandlerRef.current?.close().catch(console.error);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* "Settings" area */}
      <View style={styles.sidebar}>
        <Text style={styles.heading}>Connection Settings</Text>
        <View style={styles.row}>
          <Text>Use Azure?</Text>
          <Switch
            value={isAzure}
            onValueChange={(val) => !isConnected && setIsAzure(val)}
          />
        </View>
        {isAzure && (
          <>
            <Text>Endpoint:</Text>
            <TextInput
              style={styles.input}
              value={endpoint}
              onChangeText={(text) => setEndpoint(text)}
              editable={!isConnected}
              placeholder="https://example-endpoint"
            />
            <Text>Deployment:</Text>
            <TextInput
              style={styles.input}
              value={deployment}
              onChangeText={(text) => setDeployment(text)}
              editable={!isConnected}
            />
          </>
        )}
        <Text>API Key:</Text>
        <TextInput
          style={styles.input}
          value={apiKey}
          onChangeText={(text) => setApiKey(text)}
          editable={!isConnected}
          placeholder="Your API key"
          secureTextEntry
        />

        <View style={{ height: 20 }} />

        <Text style={styles.heading}>Conversation Settings</Text>
        <View style={styles.row}>
          <Text>Use VAD?</Text>
          <Switch
            value={useVAD}
            onValueChange={(val) => !isConnected && setUseVAD(val)}
          />
        </View>
        <Text>Instructions:</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={instructions}
          onChangeText={(text) => setInstructions(text)}
          editable={!isConnected}
          multiline
        />
        <Text>Temperature: {temperature.toFixed(1)}</Text>
        <TextInput
          style={styles.input}
          value={String(temperature)}
          onChangeText={(val) => {
            const num = parseFloat(val);
            if (!Number.isNaN(num)) setTemperature(num);
          }}
          keyboardType="numeric"
          editable={!isConnected}
        />

        <Text>Modality:</Text>
        <View style={styles.row}>
          <Button
            title="Text"
            onPress={() => !isConnected && setModality('text')}
            disabled={isConnected}
          />
          <Button
            title="Audio"
            onPress={() => !isConnected && setModality('audio')}
            disabled={isConnected}
          />
        </View>
        <Text>Current: {modality}</Text>

        <View style={{ height: 20 }} />

        <Button
          title={
            isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'
          }
          onPress={handleConnect}
          disabled={isConnecting}
        />
      </View>

      {/* Messages area + Input */}
      <View style={styles.chatArea}>
        <ScrollView style={styles.messages}>
          {messages.map((m, idx) => (
            <View
              key={idx}
              style={[
                styles.messageBubble,
                m.type === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
              ]}
            >
              <Text>{m.content}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={currentMessage}
            onChangeText={setCurrentMessage}
            placeholder="Type a message..."
            editable={isConnected && !isRecording}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={toggleRecording} disabled={!isConnected}>
            <Text style={styles.recordButton}>
              {isRecording ? 'Stop Mic' : 'Start Mic'}
            </Text>
          </TouchableOpacity>
          <Button
            title="Send"
            onPress={sendMessage}
            disabled={!isConnected || isRecording}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatInterface;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 220,
    backgroundColor: '#eee',
    padding: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messages: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    maxWidth: '75%',
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1ecf1',
  },
  bubbleAssistant: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  recordButton: {
    backgroundColor: '#f44',
    color: '#fff',
    marginHorizontal: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
});
