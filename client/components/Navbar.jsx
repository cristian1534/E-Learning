import React from 'react';
import Link from 'next/link';
import { HiOutlineMail } from 'react-icons/hi';

const Links = ["home", "courses","campus","events", "contact"]

export const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 flex items-center justify-between p-4  h-14 w-full bg-light-primary-500 shadow-xl z-50 '>
      <h1 className='text-2xl font-extrabold italic underline'>E-learning</h1>
      <div className='flex '>
        <ul className='flex gap-12 w-auto px-4   -skew-y-6 rotate-6'>
          {Links.map((link, index) => (
            <li key={index} className='group relative w-auto px-2 overflow-hidden'>
              <Link href={`/${link === 'home' ? "" : link}`} className={`z-10 text-xl uppercase text-dark-primary-800 relative transition-all duration-700
            ${link !== "contact" ? 'group-hover:text-dark-secondary-300 ' : 'hover:text-blue-700'}`}>
                {
                  link === "contact" ?
                    <HiOutlineMail size={28} />
                    : link
                }
              </Link>
              <span className={`${link !== "contact" ? 'absolute top-0  -left-40 transition-all duration-500 h-7 w-0 group-hover:w-full group-hover:left-0  overflow-hidden text-xl uppercase bg-dark-primary-800' : ""}`}>
              </span>
            </li>
          ))}
        </ul>
        <Link href={`/auth`} className='-skew-y-6 rotate-6 text-xl rounded-md uppercase px-3 bg-dark-primary-800 text-dark-secondary-300  hover:brightness-125'>
          Login
        </Link>
      </div>
    </div>
  )
}