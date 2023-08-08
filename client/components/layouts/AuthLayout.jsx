import Head from 'next/head'
import React from 'react'


export const AuthLayouts = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main >
        <div className='flex-col items-center h-screen w-full'>
          {children}
        </div>
      </main>
    </>
  )
}
