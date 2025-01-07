// app/(main)/LearnZone/voxbuddy/ChatInterface.tsx (converted for React Native/Expo)

// --- React + RN Imports
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  MutableRefObject,
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


// --- Our custom classes
import { WebSocketClient } from './WebSocketClient';
import { Player, Recorder } from './Audio';
import { BASE_ENDPOINT } from '@/config';
import AudioReactiveVisualizer from './AudioReactiveVisualizer';
import theme from '@/src/theme';



interface Message {
  id: string;
  type: 'user' | 'assistant' | 'status';
  content: string;
}

type WSControlAction = 'speech_started' | 'connected' | 'text_done';

interface WSMessage {
  id?: string;
  type: 'text_delta' | 'transcription' | 'user_message' | 'control';
  delta?: string;
  text?: string;
  action?: WSControlAction;
  greeting?: string;
}


/**
 * We centralize Audio logic in a custom hook to mimic your original approach.
 */
const useAudioHandlers = () => {
  const audioPlayerRef = useRef<Player | null>(null);
  const audioRecorderRef = useRef<Recorder | null>(null);

  const initAudioPlayer = async () => {
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Player();
      await audioPlayerRef.current.init();
    }
    return audioPlayerRef.current;
  };

  // We start/stop the recorder:
  const handleAudioRecord = async (
    webSocketClient: WebSocketClient | null,
    isRecording: boolean
  ) => {
    if (!isRecording && webSocketClient) {
      if (!audioRecorderRef.current) {
        audioRecorderRef.current = new Recorder(async (buffer) => {
          // Send audio buffer to server
          await webSocketClient.send({ type: 'binary', data: buffer });
        });
      }
      await audioRecorderRef.current.start();
      return true;
    } else if (audioRecorderRef.current) {
      await audioRecorderRef.current.stop();
      audioRecorderRef.current = null;
      return false;
    }
    return isRecording;
  };

  return { audioPlayerRef, audioRecorderRef, initAudioPlayer, handleAudioRecord };
};

export default function ChatInterface() {
  const [endpoint, setEndpoint] = useState(`ws://${BASE_ENDPOINT}/realtime`);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [validEndpoint, setValidEndpoint] = useState(true);

  const webSocketClient = useRef<WebSocketClient | null>(null);
  const messageMap = useRef(new Map<string, Message>());
  const currentConnectingMessage = useRef<Message>();
  const currentUserMessage = useRef<Message>();
  const scrollViewRef = useRef<ScrollView>(null);

  const { audioPlayerRef, audioRecorderRef, initAudioPlayer, handleAudioRecord } =
    useAudioHandlers();

  // Scroll to bottom every time messages change
  useEffect(() => {
    // Wait a tick to ensure layout is done
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
  }, [messages]);
// Automatically connect to the default endpoint on page load
useEffect(() => {
  if (!isConnected) {
    handleConnect();
  }
}, []);

  const handleWSMessage = useCallback(
    async (message: WSMessage) => {
      switch (message.type) {
        case 'transcription':
          if (message.id && currentUserMessage.current) {
            currentUserMessage.current.content = message.text || '';
            setMessages(Array.from(messageMap.current.values()));
          }
          break;
        case 'text_delta':
          if (message.id) {
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
          break;
        case 'control':
          if (message.action === 'connected' && message.greeting) {
            if (currentConnectingMessage.current) {
              currentConnectingMessage.current.content = message.greeting;
              setMessages(Array.from(messageMap.current.values()));
            }
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
          break;
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
    if (isConnected) {
        await disconnect(); // Ensure proper cleanup
    }
    
    const statusMessageId = `status-${Date.now()}`;
    const connectingMsg: Message = {
        id: statusMessageId,
        type: 'status',
        content: 'Connecting...',
    };
    currentConnectingMessage.current = connectingMsg;

    messageMap.current.clear();
    messageMap.current.set(statusMessageId, connectingMsg);
    setMessages(Array.from(messageMap.current.values()));

    setIsConnecting(true);
    try {
        webSocketClient.current = new WebSocketClient(new URL(endpoint));
        setIsConnected(true);
        receiveLoop(); // Start receiving messages on the new connection
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        setIsConnecting(false);
    }
};


const disconnect = async () => {
  if (webSocketClient.current) {
      await webSocketClient.current.close();
      webSocketClient.current = null; // Clear the client reference
  }
  setIsConnected(false);
  setMessages([]);
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

  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // ----- Render -----
  return (
    <View style={styles.container}>

   
   <View style={styles.topHalf}>
   <View >
  <Text style={styles.sectionTitle}>VoxBuddy</Text> 
    </View>

  <AudioReactiveVisualizer audioData={audioData}/>
</View>

      <View style={styles.bottomHalf}>
      {/* Main chat area */}
      <View style={styles.chatArea}>
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
            style={styles.messageInput}
            value={currentMessage}
            onChangeText={(t) => setCurrentMessage(t)}
            placeholder="Type your message..."
            editable={isConnected}
            // in RN, use onSubmitEditing or a "Send" button
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.iconButton, isRecording && styles.recordingButton]}
            onPress={toggleRecording}
            disabled={!isConnected}
          >
            {/* <Icon
              name={isRecording ? 'microphone' : 'microphone-off'}
              size={20}
              color="#000"
            /> */}
            <Text>{isRecording ? '⏹' : '🎙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={sendMessage}
            disabled={!isConnected}
          >
            <Text>✅</Text>
            {/* <Icon name="send" size={20} color="#000" /> */}
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </View>
  );
}

// ----- Basic Styles -----
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

  connectButtonText: {
    color: theme.colors.background.offWhite,
    fontSize: 14,
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
    color:theme.colors.background.offWhite
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary.medium2, // light gray
    maxWidth: '80%',
    color:theme.colors.background.offWhite
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
    borderRadius: 4,
    marginRight: 8,
    height: 40,
  },
  iconButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: '#fff',
  },
  recordingButton: {
    backgroundColor: '#fee2e2', // light red
  },
});
