import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import styles from '../Messenger.module.css';

const Message = forwardRef(({ message, user }, ref) => {
  const isUser = user === message.user;

  return (
    <div
      ref={ref}
      className={`${styles.message_card} ${
        isUser ? styles.message_user : null
      }`}
    >
      <Card
        className={`${
          isUser ? styles.message_userCard : styles.message_guestCard
        }`}
      >
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && `${message.user || 'Unkown User'}: `}
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
