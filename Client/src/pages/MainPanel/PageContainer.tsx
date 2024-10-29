import { Outlet } from 'react-router-dom';

export const PageContainer = () => {
  return (
    <div id='PageContainer' className='p-8 flex justify-center size-full items-center relative overflow-scroll'>
        <Outlet />
    </div>
  )
}
