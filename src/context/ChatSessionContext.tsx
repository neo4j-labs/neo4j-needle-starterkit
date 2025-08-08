import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export interface ChatMessage {
  id: number;
  user: string;
  message: string;
  datetime: string;
  isTyping?: boolean;
  src?: Array<string>;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatSessionContextType {
  sessions: ChatSession[];
  currentSessionId: string | null;
  currentSession: ChatSession | null;
  createNewSession: (title?: string) => string;
  switchSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  addMessageToCurrentSession: (message: ChatMessage) => void;
  updateMessageInCurrentSession: (messageId: number, updatedMessage: ChatMessage) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
  clearAllSessions: () => void;
}

const ChatSessionContext = createContext<ChatSessionContextType | undefined>(undefined);

export const useChatSession = () => {
  const context = useContext(ChatSessionContext);
  if (!context) {
    throw new Error('useChatSession must be used within a ChatSessionProvider');
  }
  return context;
};

interface ChatSessionProviderProps {
  children: ReactNode;
  initialSessions?: ChatSession[];
}

const STORAGE_KEY = 'neo4j-chat-sessions';
const CURRENT_SESSION_KEY = 'neo4j-current-session';

const loadSessionsFromStorage = (): ChatSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    // Silently handle localStorage errors
  }
  return [];
};

const loadCurrentSessionIdFromStorage = (): string | null => {
  try {
    return localStorage.getItem(CURRENT_SESSION_KEY);
  } catch (error) {
    // Silently handle localStorage errors
  }
  return null;
};

const saveSessionsToStorage = (sessions: ChatSession[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    // Silently handle localStorage errors
  }
};

const saveCurrentSessionIdToStorage = (sessionId: string | null): void => {
  try {
    if (sessionId) {
      localStorage.setItem(CURRENT_SESSION_KEY, sessionId);
    } else {
      localStorage.removeItem(CURRENT_SESSION_KEY);
    }
  } catch (error) {
    // Silently handle localStorage errors
  }
};

export const ChatSessionProvider: React.FC<ChatSessionProviderProps> = ({ children, initialSessions = [] }) => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const storedSessions = loadSessionsFromStorage();
    if (storedSessions.length > 0) {
      return storedSessions;
    }
    return initialSessions;
  });

  const [currentSessionId, setCurrentSessionId] = useState<string | null>(() => {
    const storedSessions = loadSessionsFromStorage();
    if (storedSessions.length > 0) {
      const storedCurrentId = loadCurrentSessionIdFromStorage();
      if (storedCurrentId && storedSessions.find((s) => s.id === storedCurrentId)) {
        return storedCurrentId;
      }
      return storedSessions[0].id;
    }
    return initialSessions.length > 0 ? initialSessions[0].id : null;
  });

  const currentSession = sessions.find((session) => session.id === currentSessionId) || null;

  useEffect(() => {
    saveSessionsToStorage(sessions);
  }, [sessions]);

  useEffect(() => {
    saveCurrentSessionIdToStorage(currentSessionId);
  }, [currentSessionId]);

  const createNewSession = useCallback(
    (title?: string): string => {
      const now = new Date();
      const newSessionId = `session-${Date.now()}`;
      const newSession: ChatSession = {
        id: newSessionId,
        title: title || `Chat ${sessions.length + 1}`,
        messages: [],
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newSessionId);
      return newSessionId;
    },
    [sessions.length]
  );

  const switchSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
  }, []);

  const deleteSession = useCallback(
    (sessionId: string) => {
      setSessions((prev) => {
        const filtered = prev.filter((session) => session.id !== sessionId);

        if (sessionId === currentSessionId) {
          if (filtered.length > 0) {
            setCurrentSessionId(filtered[0].id);
          } else {
            setCurrentSessionId(null);
          }
        }

        return filtered;
      });
    },
    [currentSessionId]
  );

  const addMessageToCurrentSession = useCallback(
    (message: ChatMessage) => {
      if (!currentSessionId) {
        return;
      }

      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [...session.messages, message],
              updatedAt: new Date().toISOString(),
            };
          }
          return session;
        })
      );
    },
    [currentSessionId]
  );

  const updateMessageInCurrentSession = useCallback(
    (messageId: number, updatedMessage: ChatMessage) => {
      if (!currentSessionId) {
        return;
      }

      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: session.messages.map((msg) => {
                return msg.id === messageId ? updatedMessage : msg;
              }),
              updatedAt: new Date().toISOString(),
            };
          }
          return session;
        })
      );
    },
    [currentSessionId]
  );

  const updateSessionTitle = useCallback((sessionId: string, title: string) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            title,
            updatedAt: new Date().toISOString(),
          };
        }
        return session;
      })
    );
  }, []);

  const clearAllSessions = useCallback(() => {
    setSessions([]);
    setCurrentSessionId(null);
    // Clear localStorage as well
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(CURRENT_SESSION_KEY);
    } catch (error) {
      // Silently handle localStorage errors
    }
  }, []);

  const value: ChatSessionContextType = {
    sessions,
    currentSessionId,
    currentSession,
    createNewSession,
    switchSession,
    deleteSession,
    addMessageToCurrentSession,
    updateMessageInCurrentSession,
    updateSessionTitle,
    clearAllSessions,
  };

  return <ChatSessionContext.Provider value={value}>{children}</ChatSessionContext.Provider>;
};
