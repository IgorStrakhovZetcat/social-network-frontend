import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from "react-router-dom"
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import {useDispatch, useSelector} from 'react-redux'
import { fetchRemovePost } from '../../redux/slices/posts';
import { fetchRemoveComment } from '../../redux/slices/comments';

export const Post = ({
  id,
  title,
  imageUrl,
  user,
  date,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {

  const { comments } = useSelector(state => state.comments)

  function getCommentsByThePost() {
    return  [...comments.items].filter(comment => comment.postId === id)
  }

  
  const dispatch = useDispatch()
  if (isLoading) {
    return <PostSkeleton />;
  }
  
  const onClickRemove = () => {
    if(window.confirm('Are you sure you want to delete post?')){
      getCommentsByThePost().map(comment => {
        dispatch(fetchRemoveComment(comment._id))
      })
      dispatch(fetchRemovePost(id))
    }
    
  };

function getDate() {
  const day = new Date(date).getDate()
  const month = new Date(date).getMonth()
  const year = new Date(date).getFullYear()
  return [day + '-', month + '-', year]
}

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user}  />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>

          <span className={styles.additional}>{getDate()}</span>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};


