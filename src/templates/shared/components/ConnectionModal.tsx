import { Button, Dialog, TextInput, Dropdown, Banner } from '@neo4j-ndl/react';
import { useState } from 'react';
import { setDriver } from '../utils/Driver';

interface Message {
  type: 'success' | 'info' | 'warning' | 'danger' | 'neutral';
  content: string;
}

interface ConnectionModalProps {
  open: boolean;
  setOpenConnection: (arg: boolean) => void;
  setConnectionStatus: (status: boolean) => void;
  message?: Message;
}

export default function ConnectionModal({
  open,
  setOpenConnection,
  setConnectionStatus,
  message,
}: ConnectionModalProps) {
  const protocols = ['neo4j', 'neo4j+s', 'neo4j+ssc', 'bolt', 'bolt+s', 'bolt+ssc'];
  const [selectedProtocol, setSelectedProtocol] = useState<string>('neo4j');
  const [hostname, setHostname] = useState<string>('localhost');
  const [port, setPort] = useState<number>(7687);
  const [database, setDatabase] = useState<string>('neo4j');
  const [username, setUsername] = useState<string>('neo4j');
  const [password, setPassword] = useState<string>('password');
  const [connectionMessage, setMessage] = useState<Message | null>(null);

  function submitConnection() {
    const connectionURI = `${selectedProtocol}://${hostname}:${port}`;
    setDriver(connectionURI, username, password).then((isSuccessful) => {
      setConnectionStatus(isSuccessful);
      isSuccessful
        ? setOpenConnection(false)
        : setMessage({
            type: 'danger',
            content: 'Connection failed, please check the developer console logs for more informations',
          });
    });
  }

  return (
    <>
      <Dialog size='small' open={open} aria-labelledby='form-dialog-title' disableCloseButton>
        <Dialog.Header id='form-dialog-title'>Connect to Neo4j</Dialog.Header>
        <Dialog.Content className='n-flex n-flex-col n-gap-token-4'>
          {message && <Banner type={message.type}>{message.content}</Banner>}
          {connectionMessage && <Banner type={connectionMessage.type}>{connectionMessage.content}</Banner>}
          <div className='n-flex n-flex-row n-flex-wrap'>
            <Dropdown
              id='protocol'
              label='Protocol'
              type='select'
              disabled={false}
              selectProps={{
                onChange: (newValue) => newValue && setSelectedProtocol(newValue.value),
                options: protocols.map((option) => ({ label: option, value: option })),
                value: { label: selectedProtocol, value: selectedProtocol },
              }}
              className='w-1/4 inline-block'
              fluid
            />
            <div className='ml-[2.5%] w-[55%] mr-[2.5%] inline-block'>
              <TextInput
                id='url'
                value={hostname}
                disabled={false}
                label='Hostname'
                placeholder='localhost'
                autoFocus
                fluid
                onChange={(e) => setHostname(e.target.value)}
              />
            </div>
            <div className='w-[15%] inline-block'>
              <TextInput
                id='port'
                value={port}
                disabled={false}
                label='Port'
                placeholder='7687'
                fluid
                onChange={(e) => setPort(Number(e.target.value))}
              />
            </div>
          </div>
          <TextInput
            id='database'
            value={database}
            disabled={false}
            label='Database (optional)'
            placeholder='neo4j'
            fluid
            onChange={(e) => setDatabase(e.target.value)}
            className='w-full'
          />
          <div className='n-flex n-flex-row n-flex-wrap'>
            <div className='w-[48.5%] mr-1.5 inline-block'>
              <TextInput
                id='username'
                value={username}
                disabled={false}
                label='Username'
                placeholder='neo4j'
                fluid
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='w-[48.5%] ml-[1.5%] inline-block'>
              <TextInput
                id='password'
                value={password}
                disabled={false}
                label='Password'
                placeholder='password'
                type='password'
                fluid
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={() => submitConnection()}>Submit</Button>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
