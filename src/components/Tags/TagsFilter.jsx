import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../Post';
import { TagsBlock } from '../Tags/TagsBlock';
import { fetchPosts, fetchTags } from '../../redux/slices/posts';
import { fetchComments } from '../../redux/slices/comments'
import { useParams } from 'react-router-dom'
import styles from './TagsFilter.module.scss'


export const TagsFilter = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)
  const { comments } = useSelector(state => state.comments)
  const isPostLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  const { name } = useParams();



  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    dispatch(fetchComments())
  }, [])




  function getCommentsByThePost(postId) {
    return comments.items.filter(comm => comm.postId === postId).length
  }

  function getPostsByTags() {
    return [...posts.items].filter(post => (post.tags.find(tag => tag === name)))
  }


  return (
    <>
    <span className={styles.tag}>#{name}</span>
      <Grid container spacing={4}>
        
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : getPostsByTags()).map((obj, index) => isPostLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={index}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              date={obj.date}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={getCommentsByThePost(obj._id)}
              tags={obj.tags}
              isEditable={userData ? userData._id === obj.user._id : ''}
            />
          ))}
        </Grid>


        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>


      </Grid>
    </>
  );
};