import Neo4jLogoBW from '../../../assets/img/logo.svg';
import Neo4jLogoColor from '../../../assets/img/logo-color.svg';
import { MoonIconOutline, SunIconOutline, QuestionMarkCircleIconOutline } from '@neo4j-ndl/react/icons';
import { Typography, IconButton, Tabs } from '@neo4j-ndl/react';
import React, { useState } from 'react';
import { ThemeWrapperContext } from '../../../context/ThemeWrapper';

export default function Header({ title, navItems }: { title: string; navItems: string[] }) {
  const themeUtils = React.useContext(ThemeWrapperContext);
  const [themeMode, setThemeMode] = useState<string>(themeUtils.colorMode);
  const [activeTab, setActiveTab] = useState<string>(navItems[0] || '');

  const toggleColorMode = () => {
    setThemeMode((prevThemeMode) => {
      return prevThemeMode === 'light' ? 'dark' : 'light';
    });
    themeUtils.toggleColorMode();
  };

  return (
    <div
      className='n-bg-palette-neutral-bg-weak'
      style={{ padding: '4px', borderBottom: '2px solid rgb(var(--theme-palette-neutral-border-weak))', height: '64px' }}
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
          <Typography
            className='md:inline-block'
            variant='h6'
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{ margin: 0, padding: 0 }}
          >
            <img
              src={themeMode === 'dark' ? Neo4jLogoBW : Neo4jLogoColor}
              style={{ height: '32px', minHeight: '32px', minWidth: '32px', marginRight: '8px' }}
              alt='Neo4j Logo'
            />
          </Typography>
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
          <Tabs size='large' fill='underline' onChange={(e) => setActiveTab(e)} value={activeTab}>
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
              style={{ display: 'flex', flexGrow: 0, alignItems: 'center', gap: '4px', paddingRight: '12px' }}
            >
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
            </div>
          </div>
        </section>
      </nav>
    </div>
  );
}
