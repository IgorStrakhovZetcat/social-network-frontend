import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from 'react-redux'
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/Tags/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock/CommentsBlock';
import { fetchPosts, fetchTags } from '../../redux/slices/posts';
import {fetchComments} from '../../redux/slices/comments'


export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags} = useSelector(state => state.posts)
  const { comments } = useSelector(state => state.comments)
  const isPostLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  const isCommentsLoading = comments.status === 'loading'

  const [home, setHome] = React.useState('home')

  const handleChange = (event, newValue) => {
    setHome(newValue);
  };
  

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    dispatch(fetchComments())
  }, [])
  
  function getCommentsByThePost(postId) {
    return comments.items.filter(comm => comm.postId === postId).length
  }

  function getPopularPosts(){
    return [...posts.items].sort((a, b) => b.viewsCount - a.viewsCount)
  }

  function getNewPosts() {
    return [...posts.items].sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  
  return (
    <>
      <Tabs value={home} onChange={handleChange} style={{ marginBottom: 15, marginLeft: 50 }} aria-label="basic tabs example">
          <Tab value={'home'} label="New" />
          <Tab value={'popular'} label="Popular" />
      </Tabs>

      {home === 'home' ? <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : getNewPosts()).map((obj, index) => isPostLoading ? (
            <Post key={index} isLoading={true}/>
          ) : (
            <Post
              key={index}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              date={obj.date}
              viewsCount={obj.viewsCount}
              commentsCount={getCommentsByThePost(obj._id)}
              tags={obj.tags}
              isEditable={userData ? userData._id === obj.user._id : ''}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={isCommentsLoading ? [...Array(5)] : comments.items}
            length={isCommentsLoading ? [...Array(5)].length : comments.items.length}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid> :

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : getPopularPosts()).map((obj, index) => isPostLoading ? (
            <Post key={index} isLoading={true}/>
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
          <CommentsBlock
            items={isCommentsLoading ? [...Array(5)] : comments.items}
            length={isCommentsLoading ? [...Array(5)].length : comments.items.length}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>}



     
    </>
  );
};
