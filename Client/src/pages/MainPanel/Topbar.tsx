import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Search } from './Search';
import { Button } from '@mui/base';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

interface TopbarProps {
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const Topbar = ({toggleDrawer}:TopbarProps) => {

  return (
    <div id='TopBar' className='p-4 z-[1] bg-background2 lg:bg-background border-b border-border'>
        <div className='flex items-center justify-between p-0.5'>
            <div className='flex justify-center items-center gap-2'>
              <Button className='lg:hidden flex justify-center items-center' onClick={toggleDrawer(true)}>
                <MenuIcon/>
              </Button>
              <NavLink to='/' className="lg:hidden">
                <span className='text-primary-light font-bold text-2xl'>OPEN</span>
                <span className='font-bold text-2xl'>HUD</span>
              </NavLink>
            </div>
            <div className='flex justify-center items-center h-full gap-4'>
              <Search/>
              <a href='https://github.com/JohnTimmermann/OpenHud' target='_blank' className='text-primary-light hover:text-secondary transition-colors' rel="noreferrer">
                <GitHubIcon/>
              </a>
              
            </div>
            {/* <button className='flex text-textcolor text-sm items-center gap-2 p-0.5 bg-button hover:bg-border px-3 py-1.5 rounded transition-colors'>
                <CalendarMonthIcon/>
                <span className='text-sm'>Schedule a game</span>
            </button> */}
        </div>
    </div>
  )
}
