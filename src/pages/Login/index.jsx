import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {register, handleSubmit, setError, formState: {
    errors, isValid
  }} = useForm({
    defaultValues: {
      email: 'user@gmail.com',
      password: '12345'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if(!data.payload){
      alert('Auth is wrong')
    }
    
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  
  if(isAuth){
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Sing in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type='email'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Write email'})}
          fullWidth
        />
        <TextField className={styles.field} 
        label="Password" 
        type='password'
        error={Boolean(errors.email?.message)}
        helperText={errors.password?.message}
        {...register('password', {required: 'Write password'})}
        fullWidth />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    </Paper>
  );
};
