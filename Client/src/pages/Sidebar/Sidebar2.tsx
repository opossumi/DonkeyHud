import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useLocation } from 'react-router-dom';
import { SvgIconComponent } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AccountToggle } from './AccountToggle';


const drawerWidth = 225;

interface RouteProps {
    Icon: SvgIconComponent;
    title: string;
    target?: string;
}

const routes: RouteProps[] = [
    {Icon: AddCircleIcon, title: 'Matches'},
    {Icon: PersonIcon, title: 'Players'},
    {Icon: GroupsIcon, title: 'Teams'},
    {Icon: DashboardIcon, title: 'Dashboard'},
]

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const location = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <AccountToggle />
      <Divider />
      <List>
        {routes.map((route, index) => (
        <NavLink to={route.title} onClick={handleDrawerToggle}>
          <ListItem key={route.title} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<route.Icon />}
              </ListItemIcon>
              <ListItemText primary={route.title} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        ))}
      </List>
    </div>
  );

  return (
        <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%', height: '100%'}}>
        <AppBar
            component="nav"
            position="relative"
            sx={{
            height: '64px',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar sx={{
                bgcolor: 'background.paper',
                height: '100%',
            }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                {location.pathname.substring(7)}
            </Typography>
            </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="Page navigation"
        >
            <Drawer
            // container={window.document.body}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        <Box
            component="main"
            position={'relative'}
            sx={{ 
                flexGrow: 1, p: 3, 
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Outlet />
        </Box>
        </Box>
  );
}
