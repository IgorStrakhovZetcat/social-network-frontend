import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName}) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={ `http://localhost:4444${avatarUrl}`} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
      </div>
    </div>
  );
};