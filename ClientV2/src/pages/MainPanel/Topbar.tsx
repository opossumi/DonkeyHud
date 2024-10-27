import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Search } from './Search';

const date = new Date();
export const Topbar = () => {
  return (
    <div id='TopBar' className='border-b px-4 mb-4 mt-2 pb-4 border-border'>
        <div className='flex items-center justify-between p-0.5'>
            <div className='flex flex-col justify-center'>
                <span className='text-xl block text-textcolor'>{date.toLocaleTimeString()}</span>
                <span className='text-md block text-stone-400'>{date.toLocaleDateString()}</span>
            </div>
            <div className='flex flex-col justify-center h-full'>
              <Search/>
            </div>
            {/* <button className='flex text-textcolor text-sm items-center gap-2 p-0.5 bg-button hover:bg-border px-3 py-1.5 rounded transition-colors'>
                <CalendarMonthIcon/>
                <span className='text-sm'>Schedule a game</span>
            </button> */}
        </div>
    </div>
  )
}
