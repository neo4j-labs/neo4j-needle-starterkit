import { MoonIconOutline, SunIconOutline, QuestionMarkCircleIconOutline } from '@neo4j-ndl/react/icons';
import { Typography, IconButton, Tabs, Switch, Logo } from '@neo4j-ndl/react';
import React, { useState } from 'react';
import { ThemeWrapperContext } from '../../../context/ThemeWrapper';
import User from './User';

export default function Header({
  title,
  navItems = [],
  activeNavItem = navItems[0],
  setActiveNavItem = () => {},
  useNeo4jConnect = false,
  connectNeo4j = false,
  setConnectNeo4j = () => {},
  openConnectionModal = () => {},
  userHeader = true,
}: {
  title: string;
  navItems?: string[];
  activeNavItem?: string;
  setActiveNavItem?: (activeNavItem: string) => void;
  useNeo4jConnect?: boolean;
  connectNeo4j?: boolean;
  setConnectNeo4j?: (connectNeo4j: boolean) => void;
  openConnectionModal?: () => void;
  userHeader?: boolean;
}) {
  const themeUtils = React.useContext(ThemeWrapperContext);
  const [themeMode, setThemeMode] = useState<string>(themeUtils.colorMode);

  const toggleColorMode = () => {
    setThemeMode((prevThemeMode) => {
      return prevThemeMode === 'light' ? 'dark' : 'light';
    });
    themeUtils.toggleColorMode();
  };

  return (
    <div
      className='n-bg-palette-neutral-bg-weak'
      style={{
        padding: '4px',
        borderBottom: '2px solid rgb(var(--theme-palette-neutral-border-weak))',
        height: '64px',
      }}
    >
      <nav
        className='flex items-center justify-between'
        role='navigation'
        data-testid='navigation'
        id='navigation'
        aria-label='main navigation'
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <section className='flex md:flex-row flex-col items-center w-1/6 shrink-0 grow-0'>
          <div className='md:inline-block' style={{ margin: 0, padding: 0 }}>
          <Logo className="h-6 min-h-6 min-w-12 md:h-8 md:min-h-12 md:min-w-24 md:mr-2 " type="full" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginLeft: 0, paddingLeft: 0 }}>
            <Typography className='md:inline-block hidden' variant='h6' sx={{ margin: 0, padding: 0 }}>
              {title}
            </Typography>
            <Typography className='md:hidden inline-block' variant='subheading-small'>
              {title}
            </Typography>
          </div>
        </section>

        <section
          className='flex w-1/3 shrink-0 grow-0'
          style={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            marginBottom: '-26px',
            justifyContent: 'center',
          }}
        >
          <Tabs size='large' fill='underline' onChange={(e) => setActiveNavItem(e)} value={activeNavItem}>
            {navItems.map((item) => (
              <Tabs.Tab tabId={item} key={item}>
                {item}
              </Tabs.Tab>
            ))}
          </Tabs>
        </section>
        <section className='items-center justify-end w-1/6 grow-0 flex' style={{ flexGrow: 0 }}>
          <div>
            <div
              className='inline-flex gap-x-1'
              style={{
                width: 'max-content',
                display: 'flex',
                flexGrow: 0,
                alignItems: 'center',
                gap: '4px',
                paddingRight: '12px',
              }}
            >
              {useNeo4jConnect ? (
                <Switch
                  checked={connectNeo4j}
                  onChange={(e) => {
                    if (e.target.checked) {
                      openConnectionModal();
                    } else {
                      setConnectNeo4j(false);
                    }
                  }}
                  disabled={false}
                  fluid={true}
                  label={`Connect${connectNeo4j ? 'ed' : ''} to Neo4j`}
                  labelBefore={true}
                />
              ) : (
                <></>
              )}
              <IconButton aria-label='Toggle Dark mode' clean size='large' onClick={toggleColorMode}>
                {themeMode === 'dark' ? (
                  <span role='img' aria-label='sun'>
                    <SunIconOutline />
                  </span>
                ) : (
                  <span role='img' aria-label='moon'>
                    <MoonIconOutline />
                  </span>
                )}
              </IconButton>
              <IconButton className='hidden md:inline-block' aria-label='Help' clean size='large'>
                <QuestionMarkCircleIconOutline className='n-w-6 n-h-6' />
              </IconButton>
              
              {
                userHeader ? (
                  <div className='hidden md:inline-block'>
                    <User />
                  </div>
                ) : null
              }

            </div>
          </div>
        </section>
      </nav>
    </div>
  );
}
