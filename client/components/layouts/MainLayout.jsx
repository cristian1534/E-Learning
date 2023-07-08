import React from 'react'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import Head from 'next/head'


export const MainLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className=' w-full h-screen' >
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  )
}
