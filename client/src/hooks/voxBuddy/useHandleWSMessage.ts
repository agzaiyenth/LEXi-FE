import { Message, WSMessage } from '@/types/voxbuddy/voxBuddy';
import { useCallback, useRef } from 'react';


type ConnectionState = 'connected' | 'disconnected' | 'connecting';

const useHandleWSMessage = (
  setConnectionState: (state: ConnectionState) => void,
  setMessages: (messages: Message[]) => void,
  audioPlayerRef: React.RefObject<{ clear: () => void }>
) => {
  const messageMap = useRef<Map<string, Message>>(new Map());
  const currentUserMessage = useRef<Message | null>(null);

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
    [audioPlayerRef, setMessages, setConnectionState]
  );

  return handleWSMessage;
};

export default useHandleWSMessage;