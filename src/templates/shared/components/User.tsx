import React, { useState } from 'react';
import { Menu, Typography, IconButton, Avatar } from '@neo4j-ndl/react';
import { ChevronDownIconOutline } from '@neo4j-ndl/react/icons';

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
      className='hidden 
      md:flex md:p-1.5 md:gap-2 md:h-12 md:items-center md:inline-block 
      md:border md:border-[rgb(var(--theme-palette-neutral-border-strong))] md:rounded-xl'
    >
      <Avatar className='md:flex hidden' name='JD' shape='square' size='large' type='letters' />

      <div className='flex flex-col'>
        <Typography variant='body-medium' className='p-0.5'>
          John Doe
        </Typography>

        <Typography variant='body-small' className='p-0.5'>
          john.doe@neo4j.com
        </Typography>

        <Menu className='mt-1.5 ml-4' id='menu-appbar' anchorEl={anchorEl} open={open} onClose={handleClose}>
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
