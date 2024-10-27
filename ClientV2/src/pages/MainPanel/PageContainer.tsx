import { Routes, Route, Outlet } from 'react-router-dom';

export const Grid = () => {
  return (
    <div id='Page' className='px-4 flex justify-center size-full items-center'>
        <Outlet />
    </div>
  )
}
