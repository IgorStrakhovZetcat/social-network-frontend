import React from "react";
import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux'
import { fetchRemoveComment } from '../../redux/slices/comments'



export const CommentsBlock = ({ items, children, isLoading, length }) => {
  const userData = useSelector(state => state.auth.data)
  const dispatch = useDispatch()


  function deleteComment(id) {
    if (window.confirm('Are you sure you want to delete comment?')) {
      dispatch(fetchRemoveComment(id))
    }

  }

  


  return (<>
    {length > 0 ? <SideBlock title="Comments" >
      <List >
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>




            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <a key={'Profile'}
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/profile/${obj.user._id}`}
                  >
                    <Avatar alt={obj.user.fullName} src={`http://localhost:4444${obj.user.avatarUrl}`} />
                  </a>
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                />
              )}
              {isLoading ? (<div></div>) : userData && obj.user._id === userData._id ?
                <div >
                  <IconButton onClick={() => deleteComment(obj._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </div>
                : (<div></div>)}
            </ListItem>

            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock> : <SideBlock title="Comments"> {children}</SideBlock>}</>
  );
};
