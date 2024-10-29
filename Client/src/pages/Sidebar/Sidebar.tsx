import React, { useState } from 'react';
import { AccountToggle } from './AccountToggle';
import { RouteSelect } from './RouteSelect';
import { Plan } from './Plan';

export const Sidebar: React.FC = () => {
  return (
    <>
      <nav id='sidebar' className='lg:block hidden border-r border-border bg-background2'>
        <div className='sticky h-[calc(100vh-32px-48px)]'>
          <AccountToggle />
          <RouteSelect />
        </div>
        <Plan />
      </nav>
    </>
  );
};
