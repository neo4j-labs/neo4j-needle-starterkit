import React from 'react';
import { ChatSessionProvider } from '../../../context/ChatSessionContext';
import Chatbot from './Chatbot';
import sessionData from '../assets/ChatbotSessions.json';

const initSessions = sessionData.sessions.map((session) => ({
  ...session,
  messages: session.messages.map((msg) => ({
    ...msg,
  })),
}));

interface ChatbotDemoProps {
  className?: string;
}

const ChatbotDemo: React.FC<ChatbotDemoProps> = ({ className }) => {
  return (
    <div className={`h-screen ${className || ''}`}>
      <ChatSessionProvider initialSessions={initSessions}>
        <Chatbot />
      </ChatSessionProvider>
    </div>
  );
};

export default ChatbotDemo;
