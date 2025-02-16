// app/(main)/LearnZone/voxbuddy/ChatInterface.tsx
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { BASE_ENDPOINT } from '@/config';
import AudioReactiveVisualizer from './AudioReactiveVisualizer';
import theme from '@/src/theme';
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Player } from '@/src/hooks/voxBuddy/usePlayer';
import { Recorder } from '@/src/hooks/voxBuddy/useRecorder';
import { WebSocketClient } from '@/src/hooks/voxBuddy/WebSocketClient';
import { Message, WSMessage } from '@/src/types/voxbuddy/voxBuddy';
import { useAudioHandlers } from '@/src/hooks/voxBuddy/useAudioHandlers';

export default function ChatInterface() {
  const [endpoint] = useState(`ws://${BASE_ENDPOINT}/realtime`);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const webSocketClient = useRef<WebSocketClient | null>(null);
  const messageMap = useRef(new Map<string, Message>());
  const currentConnectingMessage = useRef<Message>();
  const currentUserMessage = useRef<Message>();
  const scrollViewRef = useRef<ScrollView>(null);

  const { audioPlayerRef, audioRecorderRef, initAudioPlayer, handleAudioRecord } =
    useAudioHandlers();

  // Scroll to bottom every time messages change
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
  }, [messages]);

  // Automatically connect to the default endpoint on page load
  useEffect(() => {
    if (connectionState !== 'connected') {
      handleConnect();
    }
  }, []);

  useEffect(() => {
    if (connectionState === 'disconnected') {
        const reconnectTimeout = setTimeout(() => {
            handleConnect();
        }, 5000); 
        return () => clearTimeout(reconnectTimeout); 
    }
}, [connectionState]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleWSMessage = useCallback(
    async (message: WSMessage) => {
        if (message.type === 'control') {
            if (message.action === 'status') {
                setConnectionState(message.greeting === 'connected' ? 'connected' : 'disconnected');
            } else if (message.action === 'speech_started') {
                audioPlayerRef.current?.clear();
                const contrivedId = 'userMessage' + Math.random();
                currentUserMessage.current = {
                    id: contrivedId,
                    type: 'user',
                    content: '...',
                };
                messageMap.current.set(contrivedId, currentUserMessage.current);
                setMessages(Array.from(messageMap.current.values()));
            }
        } else if (message.type === 'transcription' && message.id && currentUserMessage.current) {
            currentUserMessage.current.content = message.text || '';
            setMessages(Array.from(messageMap.current.values()));
        } else if (message.type === 'text_delta' && message.id) {
            const existingMessage = messageMap.current.get(message.id);
            if (existingMessage) {
                existingMessage.content += message.delta || '';
            } else {
                const newMessage: Message = {
                    id: message.id,
                    type: 'assistant',
                    content: message.delta || '',
                };
                messageMap.current.set(message.id, newMessage);
            }
            setMessages(Array.from(messageMap.current.values()));
        }
    },
    [audioPlayerRef, setMessages]
);


  // Continuously read from WebSocket
  const [audioData, setAudioData] = useState<Int16Array | null>(null);

  const receiveLoop = useCallback(async () => {
    const player = await initAudioPlayer();
    if (!webSocketClient.current) return;

    for await (const message of webSocketClient.current) {
      if (message.type === "text") {
        const data = JSON.parse(message.data) as WSMessage;
        await handleWSMessage(data);
      } else if (message.type === "binary") {
        const buffer = new Int16Array(message.data);
        setAudioData(buffer); // Pass audio data to the animation
        if (player) {
          player.play(buffer); // Play the audio
        }
      }
    }
  }, [handleWSMessage, initAudioPlayer]);


  const handleConnect = async () => {
    if (connectionState !== 'disconnected') {
      await disconnect(); // Ensure proper cleanup
    }

    setConnectionState('connecting');
    const statusMessageId = `status-${Date.now()}`;
    
   

    messageMap.current.clear();
    setMessages(Array.from(messageMap.current.values()));

    try {
      webSocketClient.current = new WebSocketClient(new URL(endpoint));
      setConnectionState('connected');
      receiveLoop(); // Start receiving messages on the new connection
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionState('disconnected');
    }
  };

  const disconnect = async () => {
    if (webSocketClient.current) {
      await webSocketClient.current.close();
      webSocketClient.current = null; // Clear the client reference
    }
    setConnectionState('disconnected');
  };

  const sendMessage = async () => {
    if (currentMessage.trim() && webSocketClient.current) {
      const messageId = `user-${Date.now()}`;
      const message = {
        type: 'user_message',
        text: currentMessage,
      };
      const newMessage: Message = {
        id: messageId,
        type: 'user',
        content: currentMessage,
      };
      messageMap.current.set(messageId, newMessage);
      setMessages(Array.from(messageMap.current.values()));
      setCurrentMessage('');

      await webSocketClient.current.send({
        type: 'text',
        data: JSON.stringify(message),
      });
    }
  };

  const toggleRecording = async () => {
    try {
      const newRecordingState = await handleAudioRecord(
        webSocketClient.current,
        isRecording
      );
      setIsRecording(newRecordingState);
    } catch (error) {
      console.error('Recording error:', error);
      setIsRecording(false);
    }
  };




  // ----- Render -----
  return (
    <View style={styles.container}>


      <View style={styles.topHalf}>
        <View >
          <Text style={styles.sectionTitle}>VoxBuddy</Text>
        </View>

        <AudioReactiveVisualizer audioData={audioData} />
      </View>

      <View style={styles.bottomHalf}>
        {/* Main chat area */}
        <View style={styles.chatArea}>
        <Text style={styles.connectionStatus}>
    {connectionState === 'connecting' && 'Connecting to VoxBuddy...'}
    {connectionState === 'connected' && 'Connected to VoxBuddy'}
    {connectionState === 'disconnected' && 'Disconnected. Retrying...'}
</Text>


          {/* Messages list */}
          <ScrollView
            style={styles.messagesContainer}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.type === 'user'
                    ? styles.userBubble
                    : msg.type === 'assistant'
                      ? styles.assistantBubble
                      : styles.statusBubble,
                ]}
              >
                <Text>{msg.content}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Input area */}
          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.messageInput,
                connectionState !== 'connected' && styles.disabledInput,
              ]}
              value={currentMessage}
              onChangeText={(t) => setCurrentMessage(t)}
              placeholder="Type your message..."
              editable={connectionState === 'connected'}
              // in RN, use onSubmitEditing or a "Send" button
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              style={[
                styles.iconButton,
                (isRecording || connectionState !== 'connected') && styles.disabledButton,
              ]}
              onPress={toggleRecording}
              // disabled={!isConnected}
              disabled  //disabled temperory due to the issue with audio 
            >

              {isRecording ? (
                <Entypo name="controller-stop" size={20} color="#fef8ea" />
              ) : (
                <Ionicons name="mic" size={20} color="#fef8ea" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
             style={[
        styles.iconButton,
        connectionState !== 'connected' && styles.disabledButton, // Add disabled style
    ]}
              onPress={sendMessage}
              disabled={connectionState !== 'connected'}
            >

              <MaterialIcons name="send" size={20} color="#fef8ea" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.light2,
  },
  topHalf: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 26,
  },
  bottomHalf: {
    flex: 5,
    backgroundColor: theme.colors.secondary.light2,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
    color: theme.colors.blacks.medium
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.background.offWhite,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 16,
    borderRadius: 4,
  },
  connectionStatus: {
    textAlign: 'center',
    marginVertical: 8,
},

  chatArea: {
    flex: 1,
    flexDirection: 'column',
  },
  messagesContainer: {
    flex: 1,
    padding: 12,
  },
  messageBubble: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 6,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary.dark3, // light blue
    maxWidth: '80%',
    color: theme.colors.background.offWhite
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary.medium2, // light gray
    maxWidth: '80%',
    color: theme.colors.background.offWhite
  },
  statusBubble: {
    alignSelf: 'center',
    backgroundColor: '#f3f4f6', // slightly lighter gray
    maxWidth: '80%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    borderRadius: 9,
    marginRight: 8,
    height: 40,
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#9ac3bb',
    borderRadius: 20,
    marginRight: 6,
    backgroundColor: '#9ac3bb',
  },
  recordingButton: {
    backgroundColor: '#fee2e2', // light red
  },
  disabledInput: {
    backgroundColor: '#e0e0e0', // Light gray
    borderColor: '#bdbdbd', // Gray border
},
disabledButton: {
    backgroundColor: '#f5f5f5', // Light gray
    borderColor: '#bdbdbd', // Gray border
},
});
