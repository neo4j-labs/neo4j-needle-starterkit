import { Button, DataGrid, Typography, Widget, Tag } from '@neo4j-ndl/react';
import {
  RowModel,
  Table,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import productImg1 from './assets/product1.png';
import productImg2 from './assets/product2.png';
import productImg3 from './assets/product3.png';
import productImg4 from './assets/product4.png';
import productImg5 from './assets/product5.png';
import productImg6 from './assets/product6.png';
import React from 'react';
import { PlusCircleIconOutline, PlusIconOutline } from '@neo4j-ndl/react/icons';
import productsData from './assets/products.json';

type Product = {
  CPU: number;
  Memory: string;
  Characteristics: string;
};

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('CPU', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.Memory, {
    id: 'Memory',
    cell: (info) => info.getValue(),
    header: () => <span>Memory</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('Characteristics', {
    header: () => 'Characteristics',
    cell: (info) => <i>{info.renderValue()}</i>,
    footer: (info) => info.column.id,
  }),
];

export default function Content() {
  const products = productsData.listProducts;
  const defaultData: Product[] = products[0].defaultData as Product[];
  const [data, setData] = React.useState(() => [...defaultData]);
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: '16px',
    margin: '8px',
  };

  const table = useReactTable({
    data,
    columns,
    enableSorting: true,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div
        className='n-bg-palette-neutral-bg-default'
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Featured Product */}
        <Typography variant='h1'>{products[0].name}</Typography>
        <div style={{ ...cardStyle, flexDirection: 'row' }}>
          <img src={productImg1} alt='Product 1' style={{ width: '40%', borderRadius: '8px' }} />
          <div
            style={{
              padding: '0 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <Typography variant='body-medium'>{products[0].desc1}</Typography>
              <Typography className='md:inline-block hidden' variant='body-medium'>
                {products[0].desc2}
              </Typography>
              <div className='n-w-full n-bg-light-neutral-text-weakest md:inline-block hidden'>
                <DataGrid
                  isResizable={false}
                  tableInstance={table}
                  isKeyboardNavigable={false}
                  styling={{
                    zebraStriping: true,
                    borderStyle: 'none',
                    headerStyle: 'filled',
                  }}
                  components={{
                    Navigation: null,
                  }}
                />
              </div>
              <div className='md:flex flex-row gap-2.5 hidden'>
                <Tag>DealOfTheWeek</Tag>
                <Tag>In Stock</Tag>
                <Tag>Next day delivery</Tag>
              </div>
            </div>
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: 15 }}>
              {' '}
              {/* Align the button to the bottom */}
              <Typography variant='body-large'>Price: £{products[0].price}</Typography>
              <Button>Add to cart</Button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div>
          <Typography variant='h2'>Similar products</Typography>
          <div className='flex flex-col md:flex-row' style={{ gap: 10, padding: '10px 0' }}>
            {[productImg2, productImg3, productImg4].map((img, index) => (
              <Widget
                header={products[index + 1].name}
                isElevated={true}
                key={index}
                style={{ margin: 'auto', maxWidth: '80%' }}
              >
                <div
                  className='flex flex-col gap-2.5 md:flex-row'
                  style={{
                    gap: 10,
                  }}
                >
                  <img src={img} alt={`Product ${index + 2}`} style={{ maxWidth: '40%', alignSelf: 'center' }} />
                  <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: 15 }}>
                    {' '}
                    {/* Align the button to the bottom */}
                    <div>{products[index + 1].desc1}</div>
                    <Typography variant='body-large'>Price: £{products[index + 1].price}</Typography>
                    <Button>Add to cart</Button>
                  </div>
                </div>
              </Widget>
            ))}
          </div>
        </div>

        {/* Frequently Bought Together */}
        <div>
          <Typography variant='h2'>Frequently bought together</Typography>
          <div className='flex flex-col items-start md:flex-row' style={{ gap: 10, padding: '10px 0' }}>
            {[productImg5, productImg6].map((img, index) => (
              <Widget className='md:max-w-[30%]' header='' isElevated={true} key={index}>
                <div
                  className='flex flex-row gap-2.5 md:flex-row'
                  style={{
                    gap: 10,
                  }}
                >
                  <img src={productImg1} alt='Product 1' style={{ maxWidth: '40%' }} />
                  <Typography variant='h6' style={{ alignSelf: 'center' }}>
                    <PlusCircleIconOutline className='n-w-6 n-h-6' />
                  </Typography>
                  <img src={img} alt={`Product ${index + 2}`} style={{ maxWidth: '40%' }} />
                </div>
                <Typography variant='h4' style={{ textAlignLast: 'center' }}>
                  Package deal
                </Typography>
                <Typography variant='body-medium'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quasi? Pariatur ipsam voluptatum,
                  quas labore amet dolor dolore, aspernatur tempora quasi ullam ad, autem distinctio doloribus! Iusto
                  rem iste accusamus.
                </Typography>
              </Widget>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
