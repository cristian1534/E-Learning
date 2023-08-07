"use client"
import Link from 'next/link';
import Image from "next/image";
import notebook from '../../public/notebook.svg'

import { MainLayout } from "../../components/layouts/MainLayout";
import About from '../../components/About';

export default function Home() {

  return (
    <MainLayout title={'Home'}>
      <div className="w-full h-screen flex justify-between items-center">
        <div className="w-2/3  h-auto flex flex-col  justify-start items-start pl-20 gap-2">
          <Image
            src={notebook}
            width={300}
            height={300}
            alt='register ilustration'
          />
          <p className='text-2xl italic font-semibold'>Welcome to E-learning your place to learn more!</p>
        </div>
        <div className='w-1/3 h-auto flex flex-col justify-start items-center gap-2 relative'>
          <Link href={`/auth/register`}
            className='w-2/5 h-16 z-500 flex justify-center items-center font-bold -skew-y-6 rotate-6 text-xl uppercase px-3 bg-dark-third-900 
            text-dark-secondary-900 absolute 
            shadow-md
            after:shadow-md
            after:shadow-dark-primary-200
            before:shadow-md
            before:shadow-dark-secondary-500
            rounded-lg
            transition-all
            duration-1000
            before:absolute 
            before:content-["REGISTER!"]
            before:text-dark-third-900
             before:flex 
             before:justify-center 
             before:items-center 
             before:-top-1 
             before:left-2 
             before:rounded-lg
             before:w-full 
             before:h-full 
             before:bg-dark-secondary-500 before:z-0 
             after:absolute 
             after:content-["REGISTER!"]
             after:text-dark-secondary-500 
             after:flex 
             after:justify-center 
             after:items-center 
             after:-top-2 
             after:left-4 
             after:rounded-lg
             after:w-full 
             after:h-full 
            after:bg-dark-secondary-900 after:z-10
            
            before:hover:-top-8
            before:hover:left-12
            before:transition-all
            before:duration-1000

            after:hover:-top-16
            after:hover:left-24
            after:transition-all
            after:duration-1000
            '
          >
            REGISTER!
          </Link>
        </div>
      </div>
      <About />
    </MainLayout>
  )
}
