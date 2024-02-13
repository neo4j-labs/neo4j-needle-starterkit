/* eslint-disable no-confusing-arrow */
import { Button, Widget, Typography, Avatar } from '@neo4j-ndl/react';
import { useState } from 'react';
import ChatBotUserAvatar from '../../../assets/img/chatbot-user.png';
import ChatBotAvatar from '../../../assets/img/chatbot-ai.png';

type ChatbotProps = {
  messages: {
    id: number;
    user: string;
    message: string;
    datetime: string;
  }[];
};

export default function Chatbot(props: ChatbotProps) {
  const { messages } = props;
  const formattedTextStyle = { color: 'rgb(var(--theme-palette-discovery-bg-strong))' };
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div
      className='n-bg-palette-neutral-bg-default'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '3rem' }}>
        <Widget className='n-bg-palette-neutral-bg-default' header='' isElevated={false} style={{ height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px' }}>
            {messages.map((chat) => (
              <div
                key={chat.id}
                style={{
                  display: 'flex',
                  flexDirection: chat.user === 'chatbot' ? 'row' : 'row-reverse',
                  alignItems: 'flex-end',
                  gap: '10px',
                }}
              >
                <div style={{ width: '30px', height: '30px' }}>
                  {chat.user === 'chatbot' ? (
                    <Avatar
                      className=''
                      hasStatus
                      name='KM'
                      shape='square'
                      size='x-large'
                      source={ChatBotAvatar}
                      status='online'
                      type='image'
                      style={{ marginLeft: '-15px' }}
                    />
                  ) : (
                    <Avatar
                      className=''
                      hasStatus
                      name='KM'
                      shape='square'
                      size='x-large'
                      source={ChatBotUserAvatar}
                      status='online'
                      type='image'
                    />
                  )}
                </div>
                <Widget
                  header=''
                  isElevated={true}
                  className={chat.user === 'chatbot' ? 'n-bg-palette-neutral-bg-weak' : 'n-bg-palette-primary-bg-weak'}
                  style={{
                    padding: '4',
                    alignSelf: 'flex-start',
                    maxWidth: '55%',
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
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
                  <div style={{ textAlign: 'right', verticalAlign: 'bottom', paddingTop: '12px' }}>
                    <Typography variant='body-small'>{chat.datetime}</Typography>
                  </div>
                </Widget>
              </div>
            ))}
          </div>
        </Widget>
      </div>
      <div
        className='n-bg-palette-neutral-bg-default'
        style={{
          display: 'flex',
          gap: '10px',

          bottom: '0rem',
          padding: '10px',
        }}
      >
        <input
          className='n-bg-palette-neutral-bg-default n-rounded-lg n-border-2 n-border-palette-neutral-border-weak n-p-2'
          type='text'
          value={message}
          onChange={handleInputChange}
          style={{ flexGrow: 7, height: '40px' }}
        />
        <Button onClick={() => null} style={{ flexGrow: 2 }}>
          Submit
        </Button>
      </div>
    </div>
  );
}
