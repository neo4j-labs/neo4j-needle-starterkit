/* eslint-disable no-confusing-arrow */
import { useEffect, useRef, useState } from 'react';
import { Button, Widget, Typography, Avatar, TextInput, IconButton, useCopyToClipboard, Modal, Drawer } from '@neo4j-ndl/react';

import ChatBotAvatar from '../assets/chatbot-ai.png';
import {
  ArrowPathIconOutline,
  ClipboardDocumentIconOutline,
  HandThumbDownIconOutline,
  InformationCircleIconOutline,
  SpeakerWaveIconOutline,
  PencilSquareIconOutline,
  XMarkIconOutline,
  CheckIconOutline,
  TrashIconOutline,
  SidebarLineLeftIcon,
  ArrowRightIconOutline,
  ArrowLeftIconOutline,
} from '@neo4j-ndl/react/icons';
import RetrievalInformation from './RetrievalInformation';
import { useChatSession, ChatMessage } from '../../../context/ChatSessionContext';

type ChatbotProps = {
  messages?: {
    id: number;
    user: string;
    message: string;
    datetime: string;
    isTyping?: boolean;
    src?: Array<string>;
  }[];
};

type ChatbotResponse = {
  response: string;
  src: string[];
};

export default function Chatbot(props: ChatbotProps) {
  const { messages = [] } = props;
  const { 
    currentSession, 
    sessions, 
    createNewSession, 
    switchSession, 
    deleteSession, 
    addMessageToCurrentSession,
    updateSessionTitle 
  } = useChatSession();

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (sessions.length === 0 && !hasInitialized.current) {
      hasInitialized.current = true;
      if (messages.length > 0) {
        createNewSession('Sample Chat');
        messages.forEach((msg) => {
          addMessageToCurrentSession(msg as ChatMessage);
        });
      } else {
        createNewSession('New Chat');
      }
    }
  }, [sessions.length, messages, createNewSession, addMessageToCurrentSession]);

  const [inputMessage, setInputMessage] = useState('');
  const [, copy] = useCopyToClipboard();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [sourcesModal, setSourcesModal] = useState<string[]>([]);
  const [modelModal, setModelModal] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const [typingMessageId, setTypingMessageId] = useState<number | null>(null);
  const [currentTypingText, setCurrentTypingText] = useState<string>('');

  const handleCloseModal = () => setIsOpenModal(false);

  const formattedTextStyle = { color: 'rgb(var(--theme-palette-discovery-bg-strong))' };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const simulateTypingEffect = (responseText: ChatbotResponse) => {
    const date = new Date();
    const datetime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const messageId = Date.now();
    
    setTypingMessageId(messageId);
    setCurrentTypingText('');

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < responseText.response.length) {
        const currentText = responseText.response.substring(0, currentIndex + 1);
        setCurrentTypingText(currentText);
        currentIndex += 1;
      } else {
        setCurrentTypingText('');
        setTypingMessageId(null);
        clearInterval(typingInterval);
        
        const finalMessage: ChatMessage = {
          id: messageId,
          user: 'chatbot',
          message: responseText.response,
          datetime: datetime,
          isTyping: false,
          src: responseText.src,
        };
        addMessageToCurrentSession(finalMessage);
      }
    }, 20);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentSession) {
      return;
    }
    
    const date = new Date();
    const datetime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const userMessage: ChatMessage = { 
      id: Date.now(), 
      user: 'user', 
      message: inputMessage, 
      datetime: datetime 
    };
    
    addMessageToCurrentSession(userMessage);
    setInputMessage('');

    const chatbotReply = {
      response:
        'Hello, here is an example response with sources. To use the chatbot, plug this to your backend with a fetch containing an object response of type: {response: string, src: Array<string>}',
      src: ['1:1234-abcd-efgh-ijkl-5678:2', '3:8765-zyxw-vuts-rqpo-4321:4'],
    }; // Replace with getting a response from your chatbot through your APIs
    
    simulateTypingEffect(chatbotReply);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages, typingMessageId, currentTypingText]);

  const handleNewSession = () => {
    createNewSession();
  };

  const handleSwitchSession = (sessionId: string) => {
    switchSession(sessionId);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSession(sessionId);
  };

  const handleEditSession = (sessionId: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(sessionId);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = (sessionId: string) => {
    if (editTitle.trim()) {
      updateSessionTitle(sessionId, editTitle.trim());
    }
    setEditingSessionId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingSessionId(null);
    setEditTitle('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } 
    if (diffDays === 2) {
      return 'Yesterday';
    } 
    if (diffDays < 7) {
      return `${diffDays - 1} days ago`;
    } 
    return date.toLocaleDateString();
  };

  const currentMessages = currentSession?.messages || [];

  return (
    <div className='h-screen flex relative overflow-hidden n-bg-palette-neutral-bg-default'>
      <Drawer
        isExpanded={isDrawerOpen}
        onExpandedChange={setIsDrawerOpen}
        type="push"
        isCloseable={false}
      >
        <Drawer.Header>
            <div className="flex items-center w-full">
                <Button color='neutral' onClick={handleNewSession} fill="outlined"><PencilSquareIconOutline className="w-4 h-4 mr-4" /> New chat</Button>
            </div>
        </Drawer.Header>
        <Drawer.Body>
            
          {sessions.length === 0 ? (
            <div className="flex  flex-col p-4 text-center">
              <Typography variant="body-medium" className="n-text-palette-neutral-text-weak">
                No chat sessions yet.
              </Typography>
              <Button 
                onClick={handleNewSession}
                className="mt-3"
                size="small"
              >
                Start New Chat
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
                <div className="text-left">
                    <Typography variant="body-medium" className="n-text-palette-neutral-text-weak">
                        Chats
                    </Typography>
                </div>
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    session.id === currentSession?.id
                      ? 'n-bg-palette-primary-bg-selected'
                      : 'hover:n-bg-palette-primary-hover-weak'
                  }`}
                  onClick={() => handleSwitchSession(session.id)}
                >
                  {editingSessionId === session.id ? (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <TextInput
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        htmlAttributes={{
                          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit(session.id);
                            } else if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          },
                          autoFocus: true,
                        }}
                        className="flex-1"
                        size="small"
                      />
                      <IconButton
                        isClean
                        ariaLabel="Save"
                        onClick={() => handleSaveEdit(session.id)}
                        size="small"
                      >
                        <CheckIconOutline className="w-3 h-3" />
                      </IconButton>
                      <IconButton
                        isClean
                        ariaLabel="Cancel"
                        onClick={handleCancelEdit}
                        size="small"
                      >
                        <XMarkIconOutline className="w-3 h-3" />
                      </IconButton>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col min-w-0">
                          <Typography 
                            variant="body-medium" 
                            className={`truncate ${
                              session.id === currentSession?.id 
                                ? 'n-text-palette-primary-text' 
                                : 'n-text-palette-neutral-text'
                            }`}
                          >
                            {session.title}
                          </Typography>
                          <Typography 
                            variant="body-small" 
                            className="n-text-palette-neutral-text-weak mt-1"
                          >
                            {formatDate(session.updatedAt)} • {session.messages.length} messages
                          </Typography>
                        </div>
                        
                        <div className="flex ml-4 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <IconButton
                            isClean
                            ariaLabel="Edit"
                            onClick={(e) => handleEditSession(session.id, session.title, e)}
                            size="small"
                          >
                            <PencilSquareIconOutline className="w-3 h-3" />
                          </IconButton>
                          <IconButton
                            isClean
                            ariaLabel="Delete"
                            onClick={(e) => handleDeleteSession(session.id, e)}
                            size="small"
                            className="n-text-palette-danger-text hover:n-bg-palette-danger-bg-weak"
                          >
                            <TrashIconOutline className="w-3 h-3" />
                          </IconButton>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </Drawer.Body>
      </Drawer>

      <div className='flex-1 flex flex-col h-screen'>
        <div className='n-bg-palette-neutral-bg-weak p-4 flex items-center gap-4'>
          <IconButton
            isClean
            ariaLabel="Open Chat History"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="group relative hover:n-bg-palette-neutral-bg transition-all duration-200"
          >
            <SidebarLineLeftIcon className="w-6 h-6 opacity-100 group-hover:opacity-0 transition-opacity duration-200" />
            <ArrowRightIconOutline className={`absolute inset-0 w-6 h-6 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              isDrawerOpen ? 'hidden' : 'block'
            }`} />
            <ArrowLeftIconOutline className={`absolute inset-0 w-6 h-6 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              isDrawerOpen ? 'block' : 'hidden'
            }`} />
          </IconButton>
          <div>
            <Typography variant="h6" className="n-text-palette-neutral-text">
              {currentSession?.title || 'New Chat'}
            </Typography>
            <Typography variant="body-small" className="n-text-palette-neutral-text-weak">
              {currentMessages.length} messages
            </Typography>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto pb-6 n-bg-palette-neutral-bg-default'>
          <div className='flex flex-col gap-3 p-3 min-h-full'>
            {currentMessages.map((chat) => (
              <div
                ref={messagesEndRef}
                key={chat.id}
                className={`flex gap-2.5 items-end ${chat.user === 'chatbot' ? 'flex-row' : 'flex-row-reverse'} `}
              >
                <div className='w-8 h-8 mr-4 ml-4'>
                  {chat.user === 'chatbot' ? (
                    <Avatar
                      className='-ml-4'
                      hasStatus
                      name='KM'
                      size='x-large'
                      source={ChatBotAvatar}
                      status='online'
                      type='image'
                      shape='square'
                    />
                  ) : (
                    <Avatar
                      className=''
                      hasStatus
                      name='KM'
                      size='x-large'
                      status='online'
                      type='image'
                      shape='square'
                    />
                  )}
                </div>
                <Widget
                  header=''
                  isElevated={true}
                  className={`p-4 self-start max-w-[55%] ${
                    chat.user === 'chatbot' ? 'n-bg-palette-neutral-bg-weak' : 'n-bg-palette-primary-bg-weak'
                  }`}
                >
                  <div>
                    {chat.message.split(/`(.+?)`/).map((part, index) =>
                      index % 2 === 1 ? (
                        <span key={index} style={formattedTextStyle}>
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </div>
                  <div className='text-right align-bottom pt-3'>
                    <Typography variant='body-small'>{chat.datetime}</Typography>
                  </div>
                  <Typography variant='body-small' className='text-right'>
                    {chat.user === 'chatbot' ? (
                      <div className='flex gap-1'>
                        <>
                          <IconButton isClean ariaLabel='Search Icon'>
                            <SpeakerWaveIconOutline className='w-4 h-4 inline-block' />
                          </IconButton>
                          {chat.src && chat.src.length > 0 ? (
                            <IconButton
                              isClean
                              ariaLabel='Search Icon'
                              onClick={() => {
                                setModelModal('OpenAI GPT 4o');
                                setSourcesModal(chat.src ?? []);
                                setTimeTaken(50);
                                setIsOpenModal(true);
                              }}
                            >
                              <InformationCircleIconOutline className='w-4 h-4 inline-block' />
                            </IconButton>
                          ) : null}
                          <IconButton isClean ariaLabel='Search Icon' onClick={() => copy(chat.message)}>
                            <ClipboardDocumentIconOutline className='w-4 h-4 inline-block' />
                          </IconButton>
                          <IconButton isClean ariaLabel='Search Icon'>
                            <ArrowPathIconOutline className='w-4 h-4 inline-block' />
                          </IconButton>
                          <IconButton isClean ariaLabel='Search Icon'>
                            <HandThumbDownIconOutline className='w-4 h-4 inline-block n-text-palette-danger-text' />
                          </IconButton>
                        </>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Typography>
                </Widget>
              </div>
            ))}
            
            {typingMessageId && currentTypingText && (
              <div
                ref={messagesEndRef}
                className="flex gap-2.5 items-end flex-row"
              >
                <div className='w-8 h-8 mr-4 ml-4'>
                  <Avatar
                    className='-ml-4'
                    hasStatus
                    name='KM'
                    size='x-large'
                    source={ChatBotAvatar}
                    status='online'
                    type='image'
                    shape='square'
                  />
                </div>
                <Widget
                  header=''
                  isElevated={true}
                  className="p-4 self-start max-w-[55%] n-bg-palette-neutral-bg-weak"
                >
                  <div>
                    {currentTypingText.split(/`(.+?)`/).map((part, index) =>
                      index % 2 === 1 ? (
                        <span key={index} style={formattedTextStyle}>
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                    <span className="animate-pulse">|</span>
                  </div>
                  <div className='text-right align-bottom pt-3'>
                    <Typography variant='body-small'>Typing...</Typography>
                  </div>
                </Widget>
              </div>
            )}
          </div>
        </div>

        <div className='n-bg-palette-neutral-bg-default border-t n-border-palette-neutral-border-weak p-4'>
          <form onSubmit={handleSubmit} className='flex gap-2.5 w-full'>
            <TextInput
              className='flex-1'
              value={inputMessage}
              isFluid
              onChange={handleInputChange}
              htmlAttributes={{
                type: 'text',
                'aria-label': 'Chatbot Input',
                placeholder: 'Type your message...',
              }}
            />
            <Button type='submit' isDisabled={!inputMessage.trim()}>
              Send
            </Button>
          </form>
        </div>

        <Modal
          modalProps={{
            id: 'default-menu',
            className: 'n-p-token-4 n-bg-palette-neutral-bg-weak n-rounded-lg min-w-[60%] max-h-[80%]',
          }}
          onClose={handleCloseModal}
          isOpen={isOpenModal}
        >
          <RetrievalInformation sources={sourcesModal} model={modelModal} timeTaken={timeTaken} />
        </Modal>
      </div>
    </div>
  );
}
