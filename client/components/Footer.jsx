import React from 'react'
import Link from 'next/link';

import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { RiPagesLine } from 'react-icons/ri'

const netWork = [
  {
    name: "Cristian.M",
    github: "g1",
    web: "w1",
    linkedin: "l1",
  },
  {
    name: "Ismael.R",
    github: "g2",
    web: "w2",
    linkedin: "l2",
  }
]

export const Footer = () => {
  return (
    <div className='fixed bottom-0 h-20 w-full bg-dark-primary-800 flex  justify-start  items-center '>
      <div className='flex flex-col gap-3  w-auto px-4 '>
        {netWork.map((person, index) => (
          <div key={index} className=' flex  gap-4 items-center text-green-500'>
            <h1 className='text-sm uppercase '>{person.name}</h1>
            <div className='flex gap-2'>
              <Link className='hover:brightness-200' href={person.github}>
                <BsGithub />
              </Link >
              <Link className='hover:brightness-200' href={person.linkedin}>
                <BsLinkedin />
              </Link >
              <Link className='hover:brightness-200' href={person.web}>
                <RiPagesLine />
              </Link >
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}
