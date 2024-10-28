import React from 'react'
import { Topbar } from './Topbar'
import { Grid } from './PageContainer'

export const MainPanel = () => {
    return (

        <main id='MainPanel' className='bg-background relative text-textcolor rounded-lg pb-4 shadow h-full flex flex-col'>
            <Topbar/>
            <Grid/>
        </main>

      )
}