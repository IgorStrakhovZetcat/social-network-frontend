import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { fetchFriends } from '../../redux/slices/friends';
import { fetchGetUsers } from '../../redux/slices/auth';
import styles from './Friends.module.scss'
import List from '@mui/material/List';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';


export const Friends = () => {
    const dispatch = useDispatch()
    const { friends } = useSelector(state => state.friends)
    const userData = useSelector(state => state.auth.data)

    const users = useSelector(state => state.auth.users)
    const isFriendsLoading = friends.status === 'loading'

    React.useEffect(() => {
        dispatch(fetchFriends())
        dispatch(fetchGetUsers())
    }, [])
    


     
    function getFriends() {
        const getFriendsByUser = [...friends.items].find(f => f.user._id === userData._id).friends
        return [...users.items].filter(user => getFriendsByUser.find(f => f === user._id))
    }




    return <>
    
        <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', margin: '0px auto' }}>
            {isFriendsLoading ? <div></div> : getFriends().length === 0 ? <div className={styles.noFriends}>You don't have friends</div> : getFriends().map(friend =>

                <ListItem alignItems="flex-start" key={friend._id}>
                    <a key={'Profile'}
                        style={{ textDecoration: "none", color: "black" }}
                        href={`/profile/${friend._id}`}
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={`http://localhost:4444${friend.avatarUrl}`} alt={userData.fullName} />
                            </ListItemAvatar>
                            <ListItemText style={{ width: '180px', marginLeft: '20px' }} primary={friend.fullName} >

                            </ListItemText>
                        </ListItemButton>
                    </a>
                    <SpeakerNotesIcon className={styles.messageBtn} color="action" fontSize="large" />
                </ListItem>

            )}
        </List>
    </>
}