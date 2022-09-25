import React from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios"

export const Index = ({user, postId}) => {
  const [text, setText] = React.useState('');
  
  const onSubmit = async () => {
    try {
      const fields = {
        text,
        postId
      }
      
      await axios.post('/comments', fields)

      setText('')
    } catch (error) {
      console.warn(error)
      alert('mistake ctreates comment')
    }
  }


  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`http://localhost:4444${user.avatarUrl}`}
        />
        <form className={styles.form} onSubmit={onSubmit}>
        <div >
          <TextField
            label="Write comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => setText(e.target.value)}
          />
          <Button type='submit' color={'info'} variant="contained">Sent</Button>
        </div>
        </form>
      </div>
    </>
  );
};
