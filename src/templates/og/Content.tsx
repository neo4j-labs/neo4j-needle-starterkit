import { useEffect, useState } from 'react';
import ConnectionModal from '../shared/components/ConnectionModal';
import { Button, Label, Typography, Widget } from '@neo4j-ndl/react';
import { setDriver, disconnect } from '../shared/utils/Driver';

import Chatbot from '../../templates/shared/components/Chatbot';
import messagesData from '../../templates/shared/components/ChatbotMessages.json';

import { ArrowDownIconOutline, ArrowUpIconOutline } from '@neo4j-ndl/react/icons';

export default function Content() {
  const [init, setInit] = useState<boolean>(false);
  const [openConnection, setOpenConnection] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false);

  const messages = messagesData.listMessages;
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);
  const handleChildClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (!init) {
      let session = localStorage.getItem('neo4j.connection');
      if (session) {
        let neo4jConnection = JSON.parse(session);
        setDriver(neo4jConnection.uri, neo4jConnection.user, neo4jConnection.password).then((isSuccessful: boolean) => {
          setConnectionStatus(isSuccessful);
        });
      }
      setInit(true);
    }
  });

  return (
    <div
      className='n-bg-palette-neutral-bg-default'
      style={{
        width: '100%',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <ConnectionModal
        open={openConnection}
        setOpenConnection={setOpenConnection}
        setConnectionStatus={setConnectionStatus}
      />
      <div>Your content goes here.</div>
      <div>Happy coding!</div>

      <Typography variant='body-medium' style={{ display: 'flex', padding: '20px' }}>
        Neo4j connection Status:
        <Typography variant='body-medium' style={{ marginLeft: '10px' }}>
          {!connectionStatus ? <Label color='danger'>Not connected</Label> : <Label color='success'>Connected</Label>}
        </Typography>
      </Typography>

      {!connectionStatus ? (
        <Button onClick={() => setOpenConnection(true)}>Connect to Neo4j</Button>
      ) : (
        <Button onClick={() => disconnect().then(() => setConnectionStatus(false))}>Disconnect</Button>
      )}

      <Widget
        className='n-bg-palette-neutral-bg-default'
        header={
          <div style={{ width: '400px', display: 'flex', flexDirection: 'row', gap: '6em' }} onClick={toggleChatbot}>
            Chatbot{' '}
            {isOpen ? <ArrowDownIconOutline className='n-w-6 n-h-6' /> : <ArrowUpIconOutline className='n-w-6 n-h-6' />}{' '}
          </div>
        } // Attach the click event only to the header
        isElevated={true}
        style={{
          position: 'absolute',
          bottom: '0rem',
          right: '1rem',
          width: '400px',
          height: isOpen ? '450px' : '50px',
          overflow: 'scroll',
          transition: 'height 0.3s ease-in-out',
          borderColor: 'rgb(var(--palette-neutral-border-strongest))',
          borderRadius: '0.5rem',
          borderLeftWidth: '1px',
          borderTopWidth: '1px',
          borderRightWidth: '1px',
        }}
      >
        {isOpen && (
          <div onClick={handleChildClick}>
            <Chatbot messages={messages} />
          </div>
        )}
      </Widget>
    </div>
  );
}
