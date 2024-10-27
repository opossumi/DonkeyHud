import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import BackgroundVideo from '../../assets/Background.mp4'
import { Logo } from '../Sidebar/AccountToggle';
import { Image } from '@mui/icons-material';

export const LandingPage = () => {
    const location = useLocation();
    return (
    <div className={`LandingPage size-full ${location.pathname === '/hud' ? '' : 'dark text-stone-950 bg-stone-100'}`}>
    {location.pathname === '/' && (
        <>
            <video autoPlay muted loop className='size-full object-cover'>
                <source src={BackgroundVideo} type='video/mp4'/>
            </video>
            <Box className='absolute w-full h-screen lg:h-min lg:w-min left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-background2/95 flex flex-col justify-center items-center rounded shadow p-4'>
                <img className='w-72'  src={Logo} alt='Logo'/>
                <Box className='flex justify-center items-center gap-4 flex-col md:flex-row'>
                    <NavLink to='/admin' className="bg-button w-80 rounded shadow flex justify-center items-center text-textcolor text-5xl p-4 text-center hover:bg-border transition-colors">Admin Panel</NavLink>
                    <NavLink to='/hud' className="bg-button w-80 rounded shadow flex justify-center items-center text-textcolor text-5xl p-4 text-center hover:bg-border transition-colors" target='_blank'>HUD</NavLink>
                </Box>
            </Box>
        </>
    )}
    <Outlet />
    </div>
  )
}
