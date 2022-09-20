import React from "react";
import { useParams } from 'react-router-dom'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock/CommentsBlock";
import ReactMarkdown from 'react-markdown'
import axios from "../axios";
import {fetchComments} from '../redux/slices/comments'
import {useDispatch, useSelector} from 'react-redux'

export const FullPost = () => {
  const [data, setData] = React.useState()
  const userData = useSelector(state => state.auth.data)
  const [isLoading, setIsLoading] = React.useState(true)
  const {id} = useParams();
  
  const dispatch = useDispatch()
  const { comments } = useSelector(state => state.comments)
  const isCommentsLoading = comments.status === 'loading'
  
  React.useEffect(() => {
    dispatch(fetchComments());
   
  }, [])

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setData(res.data)
      setIsLoading(false)
    }).catch(err => {
      console.warn(err)
      alert('Mistake get post')
    })
    
  },[])

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>
  }
 
  function getCommentsByThePost() {
    return comments.items.filter(comm => comm.postId === data._id)
  }


  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        date={data.date}
        viewsCount={data.viewsCount}
        commentsCount={getCommentsByThePost().length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
          
        
      </Post>
      <CommentsBlock
        items={getCommentsByThePost()}
        length={getCommentsByThePost().length}
        isLoading={isCommentsLoading}
        
      >
        {userData ? <Index user={userData} postId={data._id}/> : ''}
      </CommentsBlock>


    </>
  );
};
