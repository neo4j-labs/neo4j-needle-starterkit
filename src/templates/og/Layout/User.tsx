import React, { useState } from 'react';
import { Menu, Typography, IconButton, Avatar } from '@neo4j-ndl/react';
import { ChevronDownIconOutline, UserIconOutline } from '@neo4j-ndl/react/icons';
import { tokens } from '@neo4j-ndl/base';

const settings = ['Profile', 'Logout'];

export default function User() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuSelect = (e: string) => {
    window.alert(e);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <div
      className='hidden md:inline-block'
      style={{
        display: 'flex',
        borderWidth: '1px',
        borderRadius: tokens.borderRadius['3xl'],
        borderColor: 'rgb(var(--theme-palette-neutral-border-strong))',
        padding: '6px',
        gap: '8px',
        alignItems: 'center',
        height: '50px'
      }}
    >
      <Avatar
        className='md:flex hidden'
        name='JD'
        shape='square'
        size='large'
        type='letters'
      />

      <div style={{ display: 'grid', flexGrow: 1 }}>
        <Typography
          variant='body-medium'
          component='a'
          href='#app-bar-with-responsive-menu'
          sx={{
            mt: '32px',
            padding: 2,
          }}
        >
          John Doe
        </Typography>

        <Typography
          variant='body-small'
          component='a'
          href='#app-bar-with-responsive-menu'
          sx={{
            mt: '32px',
            padding: 2,
          }}
        >
          john.doe@neo4j.com
        </Typography>

        <Menu style={{ marginTop: '18px' }} id='menu-appbar' anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Menu.Items>
            {settings.map((setting) => (
              <Menu.Item key={setting} onClick={() => menuSelect(setting)} title={setting} />
            ))}
          </Menu.Items>
        </Menu>
      </div>
      <IconButton aria-label='settings' clean onClick={handleClick} open={open}>
        <ChevronDownIconOutline />
      </IconButton>
    </div>
  );
}
