import { useState } from 'react';
import Header from '../shared/components/Header';
import './LandingPage.css'; // Make sure to create this CSS file
import { DataGrid, Flex, Tabs, TextInput, Typography, Widget } from '@neo4j-ndl/react';
import { MagnifyingGlassIconOutline  } from '@neo4j-ndl/react/icons';
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import productsData from './assets/networkimpact.json';
import React from 'react';
import NoGraphImg from '../../templates/movie/assets/neo4j/NoData.png';

type NetworkImpact = {
  Type: string;
  Name: string;
  Version: string;
};

const columnHelper = createColumnHelper<NetworkImpact>();

const columns = [
  columnHelper.accessor('Type', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.Name, {
    id: 'Name',
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('Version', {
    header: () => 'Version',
    cell: (info) => <i>{info.renderValue()}</i>,
    footer: (info) => info.column.id,
  }),
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchInitiated, setIsSearchInitiated] = useState(false);
  const [isSearchCompleted, setIsSearchCompleted] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(0);

  const network = productsData.ListItems;
  const defaultData: NetworkImpact[] = network as NetworkImpact[];
  const [data] = React.useState(() => [...defaultData]);

    const handleSearch = (e) => {
      e.preventDefault();
      setIsSearchCompleted(false)
      setIsSearchInitiated(true);
    };

    const table = useReactTable({
      data,
      columns,
      enableSorting: true,
      getSortedRowModel: getSortedRowModel(),
      getCoreRowModel: getCoreRowModel(),
    });

  return (
    <div>
      <Header title='NeoCyberSecurity' navItems={[]} />

      <div className="landing-page n-bg-palette-neutral-bg-default">
            <form className={`search-bar ${isSearchInitiated ? 'top' : 'center'}`} onSubmit={handleSearch}
            onTransitionEnd={() => {
              setIsSearchCompleted(true)
            }}>
            <TextInput
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    helpText="Search for any server, IP, domain, etc."
                    fluid={true}
                    rightIcon={<MagnifyingGlassIconOutline className={isSearchInitiated? "n-w-4 n-h-4" : "n-w-6 n-h-6"} />}
                />
                
            </form>
            {isSearchInitiated && isSearchCompleted &&
            
            <Widget className='n-bg-palette-neutral-bg-weak' header='' isElevated={true} style={{ minHeight: '60%', width: '60%', display: 'flex', flexDirection: 'column' }}>
            <Flex style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Tabs size='large' fill='underline' onChange={(e) => setActiveTab(e)} value={activeTab}>
                    <Tabs.Tab tabId={0}>Table</Tabs.Tab>
                    <Tabs.Tab tabId={1}>Graph</Tabs.Tab>
                </Tabs>
                <Flex className='p-8'>
                  {activeTab === 0 ? (
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
                  ) : (
                    <Flex flexDirection='row'>
                      <img src={NoGraphImg} style={{ padding: '3rem'}}/>
                      <Flex gap='8' >
                        <Typography variant='h1'>WIP Screen</Typography>
                        <Typography variant='body-medium'>
                          <p>Ideally this would display a graph of the network/search result</p>
                          <p>This would be interactive and allow user to explore the network to make a proper impact analysis</p>
                        </Typography>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </div>
              <div style={{ textAlign: 'center' }}>
                <>Results for "{searchQuery}"</>
              </div>
            </Flex>
          </Widget>
          
            }
        </div>

      <div id='footer' className='n-bg-palette-neutral-bg-default' style={{ height: '100px' }} />
    </div>
  );
}
