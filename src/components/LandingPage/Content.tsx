import { useEffect, useState } from 'react';
import { Button, Label, Typography } from '@neo4j-ndl/react';
import Industry from './Industry';
import Product from './Product';
import Component from './Component';

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
        {activeTab === 'Industry' ? <Industry /> : activeTab === 'Product' ? <Product /> : <Component />}
      </Typography>
    </div>
  );
}
