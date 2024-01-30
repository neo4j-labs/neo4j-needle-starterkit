import { Typography } from '@neo4j-ndl/react';
import Templates from './categories/Templates';
import Component from './categories/Component';

export default function Content({ activeTab }: { activeTab: string }) {
  return (
    <div
      className='n-bg-palette-neutral-bg-default'
      style={{
        width: '100%',
        padding: 3,

        gap: 1,
      }}
    >
      <Typography variant='body-medium' style={{ display: 'flex', padding: '20px' }}>
        {activeTab === 'Templates' ? <Templates /> : activeTab === 'Components' ? <Component /> : <></>}
      </Typography>
    </div>
  );
}
