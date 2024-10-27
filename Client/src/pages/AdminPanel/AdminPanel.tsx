import React from 'react'
import { Sidebar } from '../Sidebar'
import { MainPanel } from '../MainPanel';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom';


const theme = createTheme({
    palette: {
        primary: {
          main: '#0582ca',
          light: '#00a6fb',
          dark: '#003554',
        },
        secondary: {
          main: '#f50057',
        },
        text: {
          primary: 'rgba(255,255,255,0.87)',
          secondary: 'rgba(241,241,241,0.6)',
          disabled: 'rgba(115,115,115,0.38)',
        },
        background: {
          default: '#051923',
          paper: '#051923',
        },
      },
  });

export const AdminPanel = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className='lg:grid gap-4 p-4 grid-cols-[220px,_1fr]'>
        <Sidebar/>
        <MainPanel/>
    </div>
    </ThemeProvider>
  )
}
