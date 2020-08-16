import React, { useState, useEffect } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { firestore } from 'firebase/app';
import FlipMove from 'react-flip-move';
import { db } from '../../api/firebase';
import Message from './Message/Message';
import SendIcon from '@material-ui/icons/Send';
import styles from './Messenger.module.css';

function Messenger() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
            user: doc.data().user,
          }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      text: input,
      user: username,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div>
      {username ? (
        <h2>
          Hello {username}{' '}
          <span role="img" aria-label="Wave">
            👋🏼
          </span>
        </h2>
      ) : null}
      <form className={styles.messenger_form}>
        <div className={styles.message_formControl}>
          <TextField
            variant="outlined"
            value={input}
            label="New Message"
            onChange={(event) => setInput(event.target.value)}
            className={styles.messenger_input}
          />
          <IconButton
            type="submit"
            disabled={!input}
            variant="contained"
            aria-label="Send"
            onClick={sendMessage}
            className={styles.messenger_iconButton}
          >
            <SendIcon style={input ? { color: 'white' } : { color: 'grey' }} />
          </IconButton>
        </div>
      </form>
      <FlipMove>
        {messages.map((message) => (
          <Message key={message.id} message={message} user={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Messenger;
