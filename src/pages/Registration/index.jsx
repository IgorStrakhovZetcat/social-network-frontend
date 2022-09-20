import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import {useDispatch, useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import axios from "../../axios"


export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const inputFileRef = React.useRef(null)
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const {register, handleSubmit, setError, formState: {
    errors, isValid
  }} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      avatarUrl: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    if(avatarUrl){
      values.avatarUrl = avatarUrl;
    }else {
      values.avatarUrl = '/uploads/1e.gif'
    }
    
    const data = await dispatch(fetchRegister(values))
    if(!data.payload){
      alert('Registration is wrong')
    }
    
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  
  if(isAuth){
    return <Navigate to='/' />
  }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file);
      const {data} = await axios.post('/upload/avatar', formData)
      setAvatarUrl(data.url)
    } catch (error) {
      console.warn(error)
      alert('Mistake upload file')
    }
  };

  const onClickRemoveImage = () => {
    setAvatarUrl('')
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Create profile
        </Typography>
        <div className={styles.avatar}>
          <Avatar src={`http://localhost:4444${avatarUrl}`} sx={{ width: 100, height: 100 }} />
        </div>
        <Button  onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
          Upload avatar
        </Button>
        <br />
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {avatarUrl && (
          <>
            <br />
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Delete
            </Button>
            <br />
          </>
        )}

        <br />
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Write full name' })}
          className={styles.field} label="Full name" fullWidth />
        <TextField
          type='email'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Write email' })}
          className={styles.field} label="E-Mail" fullWidth />
        <TextField
          type='password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Write password' })}
          className={styles.field} label="Password" fullWidth />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Sing up
        </Button>
      </form>
    </Paper>
  );
};
