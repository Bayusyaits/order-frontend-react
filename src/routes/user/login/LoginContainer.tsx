import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {
  INITIAL_STATE,
  userLogin
} from "redux/ducks/user";

import { selectLoginData } from "./loginSelector";
import LoginView, { ViewProps } from "./LoginView";
function LoginContainer() {
  const [ isDisabled, setDisabled ] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const initialState = INITIAL_STATE['login']
  const loginState = useSelector(selectLoginData, shallowEqual);
  const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }).required();

  const {
    register,
    watch,
    setError,
    control,
    handleSubmit,
    formState
  } = useForm({
    mode: "all",
    defaultValues: initialState,
    resolver: yupResolver(schema)
  });
  const { errors } = formState;
  const watchAllFields = watch();
  useEffect(() => {
    if (loginState.loggedIn) {
      navigate('/')
    }
  }, [loginState.loggedIn])
  const handleLogin: ViewProps['handleLogin'] = (e: any) => {
    e.preventDefault()
    const {username, password} = watchAllFields
    if (!username) {
      setError('username', { type: 'focus', message: 'Username harus diisi' })
    } else if (!password) {
      setError('password', { type: 'focus', message: 'Password harus diisi' })
    } else {
      dispatch(userLogin(watchAllFields))
    }
  }
  const formHandlers = {
    register,
    control,
    errors,
    handleSubmit,
    handleLogin,
  }
  return (
      <LoginView
          {...loginState}
          {...watchAllFields}
          {...formHandlers}
          isDisabled={isDisabled}
      />
  );
}

export default LoginContainer;
