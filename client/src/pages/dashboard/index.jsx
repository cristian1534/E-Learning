"use client"
import React, { useContext } from 'react'
import WithPrivateRoute from '../../../components/WithPrivateRoute'
import { UserContext } from '@/context/UserProvider'

const Dashboard = () => {
  const { status } = useContext(UserContext);
  return (
    <>
      {status !== "authenticated" ? <h1>Cargando</h1> :
        < div className='bg-red-500 flex justify-center items-center h-screen' >
          <h1>DASHBOAD</h1>
        </div >
      }
    </>
  )
}

export default Dashboard;
Dashboard.Auth = WithPrivateRoute