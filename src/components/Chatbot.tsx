import { Button, Widget, Box, Dropdown } from '@neo4j-ndl/react';
import { ScienceMoleculeIcon, UserCircleIconOutline } from '@neo4j-ndl/react/icons';
import { useState } from 'react';

const chatbot = [
  {
    id: 1,
    message: 'Hi, I need help with creating a Cypher query for Neo4j.',
    user: 'user',
  },
  {
    id: 2,
    message: 'Sure, I can help with that. What specific data are you looking to retrieve?',
    user: 'chatbot',
  },
  {
    id: 3,
    message: 'I need to find all employees who work in the IT department.',
    user: 'user',
  },
  {
    id: 4,
    message:
      "Alright, you can use the following query: `MATCH (e:Employee)-[:WORKS_IN]->(d:Department {name: 'IT'}) RETURN e.name`. This query matches nodes labeled 'Employee' related to the 'IT' department and returns their names.",
    user: 'chatbot',
  },
  {
    id: 5,
    message: 'Thanks! And how do I get the total number of such employees?',
    user: 'user',
  },
  {
    id: 6,
    message:
      "To get the count, use: `MATCH (e:Employee)-[:WORKS_IN]->(d:Department {name: 'IT'}) RETURN count(e)`. This counts all the distinct 'Employee' nodes related to the 'IT' department.",
    user: 'chatbot',
  },
  {
    id: 7,
    message: 'Got it. What if I want to include their managers in the result?',
    user: 'user',
  },
  {
    id: 8,
    message:
      "You can expand the query like this: `MATCH (e:Employee)-[:WORKS_IN]->(d:Department {name: 'IT'}), (e)-[:REPORTS_TO]->(m:Manager) RETURN e.name, m.name`. This will return both the employees' and their managers' names.",
    user: 'chatbot',
  },
  {
    id: 9,
    message: "That's perfect. Thanks for the help!",
    user: 'user',
  },
  {
    id: 10,
    message: "You're welcome! Feel free to ask if you have more questions.",
    user: 'chatbot',
  },
];

export default function Chatbot() {
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
        justifyContent: 'space-between', // Aligns children (chat and input area) in column space
        minHeight: '100vh',
      }}
    >
      <div style={{ padding: '3rem', overflowY: 'auto', paddingBottom: '60px' }}>
        {' '}
        {/* Extra padding to account for input area */}
        <Widget className='n-bg-palette-neutral-bg-default' header='' isElevated={true} style={{ height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px' }}>
            {chatbot.map((chat) => (
              <Widget
                header=''
                isElevated={true}
                key={chat.id}
                className={`n-bg-palette-neutral-bg-weak ${chat.user === 'chatbot' ? 'align-start' : 'align-end'}`}
                style={{
                  padding: '4',
                  display: 'inline-flex',
                  alignSelf: chat.user === 'chatbot' ? 'flex-start' : 'flex-end',
                  maxWidth: '65%',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    marginLeft: chat.user === 'chatbot' ? '0' : '10px',
                    marginRight: chat.user === 'chatbot' ? '10px' : '0',
                    float: chat.user === 'chatbot' ? 'inline-start' : 'inline-end',
                  }}
                >
                  {chat.user === 'chatbot' ? (
                    <ScienceMoleculeIcon className='n-w-6 n-h-6' />
                  ) : (
                    <UserCircleIconOutline className='n-w-6 n-h-6' />
                  )}
                </div>
                <div style={{ flexGrow: 1 }}>
                {chat.message.split(/`(.+?)`/).map((part, index) => (
                    index % 2 === 1 ? <span key={index} style={formattedTextStyle}>{part}</span> : part
                ))}
                </div>
              </Widget>
            ))}
          </div>
        </Widget>
      </div>
      <div
        className='n-bg-palette-neutral-bg-weak'
        style={{
          position: 'fixed', // Fixes the input area at the bottom
          bottom: '0rem', // Distance from the bottom
          display: 'flex',
          gap: '10px',
          padding: '10px', // Optional padding for better spacing
          width: '100%',
        }}
      >
        <input
          className='n-bg-palette-neutral-bg-default n-rounded-lg n-border-2 n-border-palette-neutral-border-weak n-p-2'
          type='text'
          value={message}
          onChange={handleInputChange}
          style={{ flexGrow: 7, height: '40px' }} // Takes 70% width
        />
        <Button onClick={() => null} style={{ flexGrow: 2 }}>
          Submit
        </Button>{' '}
        {/* Takes 20% width */}
      </div>
    </div>
  );
}
