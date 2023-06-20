import Image from 'next/image'
import { Lato } from 'next/font/google'

import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'

import { AuthLayouts } from '../../../../components/layouts/AuthLayout';
import register from '../../../../public/cofee.svg'
import { useState } from 'react';
import Register from '@/pages/api/auth';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: 'italic',
  subsets: ['latin'],
  display: 'swap',
})



const FormPage = () => {

  const [form, setform] = useState('Login')

  const initialValues = (form === 'Login') ?
    {
      email: '',
      password: ''
    } : {
      name: '',
      userName: '',
      email: '',
      password: '',
      Rpassword: ''
    }


  const validationSchema = Yup.object().shape({
    email: Yup.string().when('form', {
      is: 'Login',
      then: Yup.string()
        .email('Ingresa un correo electrónico válido')
        .required('El correo electrónico es requerido')
    }),
    password: Yup.string().when('form', {
      is: 'Login',
      then: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida')
    }),
    name: Yup.string().when('form', {
      is: 'Registro',
      then: Yup.string().required('El nombre es requerido')
    }),
    userName: Yup.string().when('form', {
      is: 'Registro',
      then: Yup.string().required('El nombre de usuario es requerido')
    }),
    email: Yup.string().when('form', {
      is: 'Registro',
      then: Yup.string()
        .email('Ingresa un correo electrónico válido')
        .required('El correo electrónico es requerido')
    }),
    Rpassword: Yup.string().when('form', {
      is: 'Registro',
      then: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Repite la contraseña')
    })
  });

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (form === 'Register') {
        const resp = Register()
      }
    }
  })


  const handdleForm = () => {
    if (form !== 'Register') setform('Register');
    if (form !== 'Login') setform('Login');

  }


  return (
    <AuthLayouts title={form}>
      <div className={`w-full h-full flex flex-col justify-center items-center gap-4 bg-dark-secondary-500 ${lato.className}`}>
        <div className='absolute top-10 right-0'>
          <div className='w-20 h-auto rounded-l-md pl-2 bg-dark-primary-200'>
            <button className='font-semibold text-1xl w-full  text-dark-third-700'
              onClick={handdleForm}
            >
              {form}
            </button>
          </div>
        </div>

        <div className='h-16 absolute top-5'>
          <h1 className='text-4xl font-extrabold'> {form === 'Register' ? "Let's sign you in." : "Let's go"}</h1>
          <h5 className='text-2xl font-medium'>
            {form === 'Register' ? "We want to show you our web!" : "We miss you"}
          </h5>
        </div>

        <div className='w-full h-auto flex justify-center'>
          <Image
            src={register}
            width={100}
            height={100}
            alt='register ilustration'
          />
        </div>

        <div className=' flex justify-end items-center lg:justify-center lg:items-center w-auto lg:pr-24'>
          <form className='flex flex-wrap place-content-center gap-3 md:w-2/4 lg:w-96  h-3/5 md:h-3/4 lg:rounded-md' onSubmit={handleSubmit}>
            {
              form === 'Register' &&
              <input className=' h-12 w-5/6 rounded-md bg-light-primary-100 border border-light-primary-800 p-3' placeholder='Name' type="text" name='name'
                onChange={handleChange}
                value={values.name}
                id='name' />
            }
            {
              form === 'Register' &&
              <input className=' h-12 w-5/6 rounded-md bg-light-primary-100 border border-light-primary-800 p-3' placeholder='Username' type="text" name='userName'
                onChange={handleChange}
                value={values.userName}
                id='userName' />
            }

            <input className=' h-12 w-5/6 rounded-md bg-light-primary-100 border border-light-primary-800 p-3' placeholder='Email' type="text" name='email'
              onChange={handleChange}
              value={values.email}
              id='email' />
            <input className=' h-12 w-5/6 rounded-md bg-light-primary-100 border border-light-primary-800 p-3' placeholder='Password' type="password" name='password'
              onChange={handleChange}
              value={values.password}
              id='password' />

            {
              form === 'Register' &&
              <input className=' h-12 w-5/6 rounded-md bg-light-primary-100 border border-light-primary-800 p-3' placeholder='Repeat password' type="password" name='Rpassword'
                onChange={handleChange}
                value={values.Rpassword}
                id='Rpassword' />
            }

            <button type='submit' className='h-12 w-2/4 bg-dark-primary-200 text-light-primary-300 rounded-md font-semibold'>
              {form === 'Register' ?
                "Create acount"
                :
                "Login"
              }
            </button>
          </form>
        </div>
      </div>
    </AuthLayouts>
  )
}


export default FormPage;