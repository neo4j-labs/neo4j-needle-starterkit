/* eslint-disable no-confusing-arrow */
import { useState } from 'react';
import { Button, Widget, Typography, Avatar, TextInput } from '@neo4j-ndl/react';

import ChatBotUserAvatar from '../assets/chatbot-user.png';
import ChatBotAvatar from '../assets/chatbot-ai.png';

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
  const [message, setMessage] = useState('');
  const formattedTextStyle = { color: 'rgb(var(--theme-palette-discovery-bg-strong))' };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className='n-bg-palette-neutral-bg-default flex flex-col justify-between min-h-full max-h-full overflow-hidden'>
      <div className='flex overflow-y-auto pb-12'>
        <Widget className='n-bg-palette-neutral-bg-default h-full' header='' isElevated={false}>
          <div className='flex flex-col gap-3 p-3'>
            {messages.map((chat) => (
              <div
                key={chat.id}
                className={`flex gap-2.5 items-end ${chat.user === 'chatbot' ? 'flex-row' : 'flex-row-reverse'} `}
              >
                <div className='w-8 h-8'>
                  {chat.user === 'chatbot' ? (
                    <Avatar
                      className='-ml-4'
                      hasStatus
                      name='KM'
                      shape='square'
                      size='x-large'
                      source={ChatBotAvatar}
                      status='online'
                      type='image'
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
                </Widget>
              </div>
            ))}
          </div>
        </Widget>
      </div>
      <div className='n-bg-palette-neutral-bg-default flex gap-2.5 bottom-0 p-2.5 w-full'>
        <TextInput
          className='n-bg-palette-neutral-bg-default flex-grow-7 w-full'
          type='text'
          value={message}
          fluid
          onChange={handleInputChange}
        />
        <Button onClick={() => null}>Submit</Button>
      </div>
    </div>
  );
}
