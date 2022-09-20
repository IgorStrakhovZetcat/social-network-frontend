import React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from "../../redux/slices/auth";
import {useDispatch, useSelector} from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth)

  
  const dispatch = useDispatch()

  const onClickLogout = () => {
    if(window.confirm('Are you sure you want to log out?')){
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
    
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Social Network</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button color='info' variant="contained">New Post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  <LogoutIcon/>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button  variant="contained">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
