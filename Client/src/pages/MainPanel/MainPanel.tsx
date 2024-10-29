import React, { useState } from 'react'
import { Topbar } from './Topbar'
import { PageContainer } from './PageContainer'
import { Box, Drawer, List, ListItem } from '@mui/material';
import { AccountToggle } from '../Sidebar/AccountToggle';
import { RouteSelect } from '../Sidebar/RouteSelect';

export const MainPanel = () => {

const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={{bgcolor: 'background.paper', width: '225px', height: '100%'}}>
      <List>
        <ListItem sx={{p: 0}}>
          <AccountToggle />
        </ListItem>
        <ListItem sx={{p: 0}}>
          <RouteSelect />
        </ListItem>
      </List>
    </Box>
  );

    return (

        <main id='MainPanel' className='bg-background relative text-textcolor rounded-lg shadow h-full flex flex-col'>
            {/* Drawer for mobile view */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerContent}
            </Drawer>

            
            <Topbar toggleDrawer={toggleDrawer}/>
            <PageContainer/>
        </main>

      )
}