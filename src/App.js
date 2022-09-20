import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom"
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch, useSelector } from 'react-redux'
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { TagsFilter } from "./components/Tags/TagsFilter";

import styles from './pages/Home/Home.module.scss'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])



  const mybutton = document.getElementById("myBtn");
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }


  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/posts/:id'} element={<FullPost />} />
          <Route path={'/posts/:id/edit'} element={<AddPost />} />
          <Route path={'/add-post'} element={<AddPost />} />
          <Route path={'/tag/:name'} element={<TagsFilter />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Registration />} />
        </Routes>
      </Container>


      <button onClick={topFunction} id="myBtn" className={styles.btnScrolle} title="Go to top">Top</button>
    </>
  );
}

export default App;
