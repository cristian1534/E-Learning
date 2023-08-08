'use client';
import React, { useEffect } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import Head from 'next/head'
import { useAuth } from '@/context/hooks/useAuth'
import Dashboard from '@/pages/dashboard'


export const MainLayout = ({ children, title }) => {

  const { isAuthenticated } = useAuth();

  useEffect(() => {

  }, [isAuthenticated])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className=' w-full h-screen' >
        <Navbar isAuthenticated={isAuthenticated} />
        {
          !isAuthenticated
            ? children
            : <Dashboard />
        }
        <Footer />
      </main>
    </>
  )
}
