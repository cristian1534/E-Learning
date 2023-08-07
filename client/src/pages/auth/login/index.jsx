"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Lato } from 'next/font/google';
import { FaWalking } from 'react-icons/fa';

import { useFormik } from 'formik';
import { MrMiyagi } from '@uiball/loaders'
import * as Yup from 'yup';



import { AuthLayouts } from '../../../../components/layouts/AuthLayout';

import register from '../../../../public/cofee.svg';
import { useAuth } from '@/context/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: 'italic',
  subsets: ['latin'],
  display: 'swap',
});

const FormPage = () => {
  const { userState, isAuthenticated, OnLogin } = useAuth();
  const router = useRouter()
  
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);



  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('* Email not valid')
      .required('* Email is required'),
    password: Yup.string()
      .min(8, '* The password must have a minimum of 8 characters.')
      .required('* Password is required'),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleLogin({ email: values.email, password: values.password })
    },
  });

  const handleLogin = async ({ email, password }) => {
    await OnLogin({ email, password });
    router.push('/')
  }




  return (
  <AuthLayouts title={"login"}>
      <div className={`w-screen h-screen flex flex-col justify-center items-center gap-4 bg-dark-secondary-500 ${lato.className}`}>
        <div className='w-full h-auto flex justify-center'>
          <Image
            src={register}
            width={100}
            height={100}
            alt='register ilustration'
          />
        </div>

        <div className='flex justify-end items-center'>
          <form className='flex flex-wrap place-content-center gap-3 md:w-2/4 lg:w-96  h-3/5 md:h-3/4 lg:rounded-md' onSubmit={handleSubmit}>
            <div className='h-16 w-auto'>
              <input
                className='h-12 w-80 rounded-md bg-light-primary-100 border border-light-primary-800 p-3'
                placeholder='Email'
                type="text"
                name="email"
                onChange={handleChange}
                value={values.email || ''}
                id='email'
              />
              {touched.email && errors.email && (
                <p className='pl-2 text-sm text-red-500'>{errors.email}</p>
              )}
            </div>
            <div className='h-16 w-auto'>
              <input
                className='h-12 w-80  rounded-md bg-light-primary-100 border border-light-primary-800 p-3'
                placeholder='Password'
                type="password"
                name='password'
                onChange={handleChange}
                value={values.password || ''}
                id='password'
              />
              {touched.password && errors.password && (
                <p className='pl-2 text-sm text-red-500'>{errors.password}</p>
              )}
            </div>
            <button type='submit' className={`h-12 w-2/4 bg-dark-primary-200 text-light-primary-300 rounded-md font-semibold 
            border-l-2 border-b-2 hover:brightness-125 hover:border-l-4 hover:border-b-4 hover:border-white hover:translate-x-1 hover:-translate-y-1 ${userState.status === 'checking' && 'opacity-0 disabled select-none cursor-wait'}`}>
              login
            </button>
          </form>
        </div>
        <div className='h-9'>
          {
            userState.status === 'checking' &&
            <div className=''>
              <MrMiyagi
                size={35}
                lineWeight={3.5}
                speed={1}
                color="black"
              />
            </div>
          }
        </div>
        <div className='flex justify-end  w-full px-2 fixed bottom-4 '>
          <Link href={'/'} className='flex justify-center items-center hover:text-white'>
            <FaWalking size={20} />
            <p>  HOME</p>
          </Link>
        </div>
      </div>
    </AuthLayouts>
  )
}

export default FormPage;