import React from 'react'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Logo from '../../assets/Logo.png'
import { NavLink } from 'react-router-dom';

export const AccountToggle = () => {
  return (
    <div className='border-b mb-4 pb-4 border-border'>
        {/* <button className='flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center'>
            <img
            src='https://i.pravatar.cc/150?img=3'
            alt='Random Profile'
            className='size-8 rounded shrink-0 bg-violet-500 shadow'
            />
            <div className='text-start'>
                <span className='text-sm font-bold block'> John Timmermann</span>
                <span className='text-xs block text-stone-500 w-[85%] overflow-hidden'>johnwtimmermann@yahoo.com</span>
            </div>
            <UnfoldMoreIcon className='absolute right-2 text-sm'/>
        </button> */}
        <NavLink to='/' className='flex p-0.5 rounded transition-colors relative gap-2 w-full items-center'>
          <div className='size-full flex justify-center'>
              <img
              src={Logo}
              alt='Logo'
              className='flex p-0.5 w-1/2 relative'
              />
          </div>
        </NavLink>
    </div>
  )
}

export { Logo}