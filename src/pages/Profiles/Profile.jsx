import { selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector} from 'react-redux'
import styles from './Profile.module.scss'
import { Navigate, useParams } from "react-router-dom";
import React from 'react';
import { fetchGetUsers } from '../../redux/slices/auth';
import axios from "../../axios";
import { fetchFriends } from '../../redux/slices/friends';


export const Profile = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth);
    const {id} = useParams()
    const users = useSelector(state => state.auth.users)
    const userData = useSelector(state => state.auth.data)
    const isUsersLoading = users.status === 'loading'
   
    const { friends } = useSelector(state => state.friends)
    const isFriendsLoading = friends.status === 'loading'

    React.useEffect(() => {
        dispatch(fetchGetUsers())
        dispatch(fetchFriends())
      }, [])

      
    function getUser() {
        return [...users.items].find(user => user._id === id)
    }
    
    async function addToFriends() {
        try {
            const idListFriends = [...friends.items].find(f => f.user._id === userData._id)._id
            
            const getFriendsByUser = [...friends.items].find(f => f.user._id === userData._id).friends
           
            const fields = {
                friends:  getFriendsByUser.join(' ') + ' ' + id
            }
            
            await axios.patch(`/friends/${idListFriends}`, fields)
            
        } catch (error) {
            console.warn(error)
            alert('mistake add to friend')
        }
         
        
    }


    if(!window.localStorage.getItem('token') && !isAuth){
        return <Navigate to='/' />
      }


    return <>
    {isUsersLoading ? <div></div> : <div className={styles.root}>
            <img className={styles.avatar} src={`http://localhost:4444${getUser().avatarUrl}`} alt={getUser().fullName} />
            <div >
                <span>User name: {getUser().fullName}</span>
                <br/>
                <span>Email: {getUser().email}</span>
                <br/>

                {userData ? userData._id === getUser()._id ? <></> : isFriendsLoading ? <></> : <button onClick={addToFriends}>Send a friend request</button> : <div></div>}
                
            </div>
            
        </div>
        
    }
        
    
    
    </>
}