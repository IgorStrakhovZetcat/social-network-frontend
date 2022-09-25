import { MenuItem, MenuList } from "@mui/material"
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from '@mui/icons-material/People';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import styles from './NavigationMenu.module.scss'
import { fetchAuthMe, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector} from 'react-redux'
import React from 'react';


export const NavigationMenu = () => {

    
    
    const userData = useSelector(state => state.auth.data)
   
   




    return <>
        <div className={styles.menuList}>
            <MenuList>
                <a key={'Profile'}
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/profile/${userData._id}`}
                >
                    <MenuItem><AssignmentIndIcon color="action" fontSize="large" /></MenuItem>
                </a>
                <a key={'Friends'}
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/myfriends`}
                >
                <MenuItem><PeopleIcon color="action" fontSize="large" /></MenuItem>
                </a>
                <MenuItem><SpeakerNotesIcon color="action" fontSize="large" /></MenuItem>

            </MenuList>
        </div>
    
    
    </>
}