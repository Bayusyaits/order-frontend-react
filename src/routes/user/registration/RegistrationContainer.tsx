import React, { useState, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { INITIAL_STATE, userRegistration } from 'redux/ducks/user'

import { selectRegistrationData } from './registrationSelector'
import RegistrationView, { ViewProps } from './RegistrationView'
function RegistrationContainer() {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialState = INITIAL_STATE['registration']
  const registrationState = useSelector(selectRegistrationData, shallowEqual)
  const schema = yup
    .object({
      username: yup.string().required('Username harus diisi'),
      password: yup.string().required('Password harus diisi'),
    })
    .required('Username dan Password harus diisi')

  const { register, watch, setError, control, handleSubmit, formState } = useForm({
    mode: 'all',
    defaultValues: initialState,
    resolver: yupResolver(schema),
  })
  const { errors } = formState
  const watchAllFields = watch()
  useEffect(() => {
    if (registrationState.loggedIn) {
      navigate('/')
    }
  }, [registrationState.loggedIn])
  const handleRegistration: ViewProps['handleRegistration'] = (e: any) => {
    e.preventDefault()
    const { username, password } = watchAllFields
    if (!username) {
      setError('username', { type: 'focus', message: 'Username harus diisi' })
    } else if (!password) {
      setError('password', { type: 'focus', message: 'Password harus diisi' })
    } else {
      dispatch(userRegistration(watchAllFields))
    }
  }
  const formHandlers = {
    register,
    control,
    errors,
    handleSubmit,
    handleRegistration,
  }
  return (
    <RegistrationView
      {...registrationState}
      {...watchAllFields}
      {...formHandlers}
      isDisabled={isDisabled}
    />
  )
}

export default RegistrationContainer
