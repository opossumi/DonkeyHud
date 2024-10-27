import React from 'react'
import Patreon from '../../assets/patreon.svg'

export const Plan = () => {
  return (
    <div className='flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-2 border-border justify-end text-xs'>
        <div className='flex items-center justify-between'>
            <div>
                <p className='font-bold text-textcolor'>Free</p>
                <p className='text-stone-500'>Support on Patreon</p>
            </div>
            <a href='https://www.patreon.com/JTMythic' target='_blank' className='px-2 py-1.5 font-medium bg-black hover:bg-stone-900 transition-colors rounded' rel="noreferrer"><img className='size-5' src={Patreon} alt='Patreon'/></a>
        </div>
    </div>
  )
}
