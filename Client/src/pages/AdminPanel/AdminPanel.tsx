import React, { useState } from 'react'
import { Sidebar } from '../Sidebar'
import { MainPanel } from '../MainPanel';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import ResponsiveDrawer from '../Sidebar/Sidebar2';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0c9852',
      light: 'rgb(60, 172, 116)',
      dark: 'rgb(8, 106, 57)',
    },
    secondary: {
      main: '#f50057',
      light: 'rgb(247, 51, 120)',
      dark: 'rgb(171, 0, 60)'
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
          },
    background: {
      default: '#111318',
      paper: '#1a1c20',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
});

export const AdminPanel = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <div id='AdminPanel' className='lg:grid rounded-lg grid-cols-[225px,_1fr] bg-background h-full'>
          <Sidebar/>
          {/* <ResponsiveDrawer/> */}
          <MainPanel/>
        </div>
    </ThemeProvider>
  )
}
