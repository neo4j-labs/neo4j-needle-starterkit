import React, { useEffect } from 'react';
import { Button, Dialog, Switch, TextInput, Dropdown, TextLink } from '@neo4j-ndl/react';
import { PlayIconOutline } from '@neo4j-ndl/react/icons';
/**
 * Configures setting the current Neo4j database connection for the dashboard.
 */
export default function ConnectionModal({open}) {
  const protocols = ['neo4j', 'neo4j+s', 'neo4j+ssc', 'bolt', 'bolt+s', 'bolt+ssc'];

  return (
    <>
      <Dialog
        size='small'
        open={open}
        aria-labelledby='form-dialog-title'
        disableCloseButton
      >
        <Dialog.Header id='form-dialog-title'>Connect to Neo4j</Dialog.Header>
        <Dialog.Content className='n-flex n-flex-col n-gap-token-4'>
          <div className='n-flex n-flex-row n-flex-wrap'>
            <Dropdown
              id='protocol'
              label='Protocol'
              type='select'
              disabled={false}
              selectProps={{
                options: protocols.map((option) => ({ label: option, value: option })),
                value: { label: 'protocol', value: 'protocol' },
              }}
              style={{ width: '25%', display: 'inline-block' }}
              fluid
            />
            <div style={{ marginLeft: '2.5%', width: '55%', marginRight: '2.5%', display: 'inline-block' }}>
              <TextInput
                id='url'
                value=''
                disabled={false}
                label='Hostname'
                placeholder='localhost'
                autoFocus
                fluid
              />
            </div>
            <div style={{ width: '15%', display: 'inline-block' }}>
              <TextInput
                id='port'
                value=''
                disabled={false}
                label='Port'
                placeholder='7687'
                fluid
              />
            </div>
          </div>
          <TextInput
            id='database'
            value=''
            disabled={false}
            label='Database (optional)'
            placeholder='neo4j'
            fluid
          />
        </Dialog.Content>
      </Dialog>
    </>
  );
}