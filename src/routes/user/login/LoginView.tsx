import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'

type Errors = {
  username?: {
    message: null
  }
  password?: {
    message: null
  }
}
export interface ViewProps {
  handleLogin: any
  isDisabled: boolean
  handleSubmit: UseFormReturn['handleSubmit']
  register: UseFormReturn['register']
  errors: Errors
  loggedIn: boolean
  username?: string
}

function LoginView({ handleSubmit, handleLogin, errors, register, isDisabled }: ViewProps) {
  return (
    <div className='container sm:px-10'>
      <div className='block'>
        <div className='h-screen flex'>
          <form
            onSubmit={(e) => handleSubmit(handleLogin(e))}
            className='my-auto mx-auto bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto py-5'
          >
            <h2 className='intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left'>
              Login
            </h2>
            <div className='intro-x mt-8'>
              <div className={`input-form ${errors.username?.message ? 'has-error' : ''}`}>
                <input
                  {...register('username', {
                    required: 'Username harus diisi',
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  name='username'
                  type='text'
                  className='intro-x login__input form-control py-3 px-4 border-gray-300 block'
                  placeholder='Username'
                />
                {errors.username?.message}
              </div>
              <div className={`input-form ${errors.password?.message ? 'has-error' : ''}`}>
                <input
                  {...register('password', {
                    required: 'password harus diisi',
                  })}
                  name='password'
                  type='password'
                  className='intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4'
                  placeholder='Password'
                />
                {errors.password?.message}
              </div>
            </div>
            <div className='intro-x mt-5 xl:mt-8 text-center xl:text-left'>
              <button
                disabled={isDisabled}
                type='submit'
                className='btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top'
              >
                Login
              </button>
              <Link
                to={'/registration'}
                className='btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top'
              >
                Registration
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginView
