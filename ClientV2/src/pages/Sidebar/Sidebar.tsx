import React, { useState } from 'react';
import { AccountToggle } from './AccountToggle';
import { RouteSelect } from './RouteSelect';
import { Plan } from './Plan';
import { Drawer, List, ListItem, Box,} from '@mui/material';
import { Button } from '@mui/base';
import MenuIcon from '@mui/icons-material/Menu';

export const Sidebar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem>
          <AccountToggle />
        </ListItem>
        <ListItem>
          <RouteSelect />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Button className='fixed top-1 left-1 lg:hidden z-10 size-12 bg-border hover:bg-border rounded text-textcolor' onClick={toggleDrawer(true)}><MenuIcon/></Button>
      {/* Drawer for mobile view */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>

      {/* Sidebar for larger screens */}
      <nav id='sidebar' className='lg:block hidden'>
        <div className='sticky top-4 h-[calc(100vh-32px-48px)]'>
          <AccountToggle />
          <RouteSelect />
        </div>
        <Plan />
      </nav>
    </>
  );
};
