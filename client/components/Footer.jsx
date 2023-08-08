import React from 'react'


export const Footer = () => {
  return (
    <div className='fixed bottom-0 h-20 w-full bg-transparent flex  justify-between px-4  items-center '>
      <div className='flex flex-col gap-3  w-auto px-4 '>
      </div>
      <div className='-skew-y-6 rotate- bg-dark-secondary-500 h-auto w-24 flex justify-center items-center border-b-2 border-dark-secondary-200 shadow-md shadow-blue-300  '>
        <p className='text-dark-primary-100 hover:text-dark-secondary-100'>CHAT HERE</p>
      </div>
    </div>
  )
}
