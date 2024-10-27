import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {
  return (
      <div id='Search' className='size-full bg-background relative rounded flex justify-center items-center px-2 py-1.5 text-sm text-textcolor gap-2'>
          <SearchIcon/>
          <input type='text' placeholder='Search' className='bg-transparent focus:outline-none w-full'/>
          {/* TODO:  Look into cmdk search bar*/}
      </div>
  )
}
