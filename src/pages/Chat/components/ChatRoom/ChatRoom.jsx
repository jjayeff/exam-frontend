import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useSubscription, gql } from '@apollo/client';
import './ChatRoom.scss';

const QUERY_MESSAGES = gql`
  query GetMessage($roomName: String!) {
    messages(roomName: $roomName) {
      id
      body
      createAt
      from {
        name
      }
    }
  }
`;

const MUTATION_SEND_MESSAGE = gql`
  mutation SendMessage($roomName: String!, $message: String!, $name: String!) {
    sendMessage(
      roomName: $roomName
      input: { body: $message, from: { name: $name } }
    ) {
      successful
    }
  }
`;

const SUBSCRIPTION_NEW_MESSAGE = gql`
  subscription NewMessage($roomName: String!) {
    newMessage(roomName: $roomName) {
      id
      body
      createAt
      from {
        name
      }
      roomName
    }
  }
`;

const ChatRoom = (props) => {
  const { name, roomName } = props;
  const bottomRef = useRef();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const result = useQuery(QUERY_MESSAGES, {
    variables: { roomName },
  });
  const [sendMessage] = useMutation(MUTATION_SEND_MESSAGE);
  const subscription = useSubscription(SUBSCRIPTION_NEW_MESSAGE, {
    variables: { roomName },
  });

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    const { loading, data } = result;
    if (!loading && data) {
      setMessages(data.messages);
    }
  }, [result.loading, result.data]);

  useEffect(() => {
    const { loading, data } = subscription;
    if (!loading && data && data.newMessage.roomName === roomName) {
      setMessages([...messages, data.newMessage]);
    }
  }, [subscription.loading, subscription.data]);

  const onSubmitMessage = (event) => {
    event.preventDefault();
    if (message !== '') {
      sendMessage({ variables: { name, roomName, message } });
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const renderMessages = () => {
    return messages.map((message, i) => (
      <div
        ref={i === messages.length - 1 ? bottomRef : null}
        className={`message-box ${name === message.from.name ? 'right' : ''}`}
        key={message.id}
      >
        <div className="sender-name">คุณ {message.from.name}</div>
        <div className="message-content">{message.body}</div>
      </div>
    ));
  };

  const renderConntent = () => {
    if (result.loading) return <h1>Loading...</h1>;

    if (result.error) return <h1>Error...</h1>;

    return renderMessages();
  };

  return (
    <section className="chat-room container">
      <div className="chat-room-header">ห้อง {roomName}</div>
      <div className="chat-room-content">
        <div className="chat-history">{renderConntent()}</div>
      </div>
      <div className="chat-room-footer">
        <div className="chat-bar">
          <div className="enter-text-box">Enter เพื่อส่ง</div>
          <form onSubmit={onSubmitMessage}>
            <input
              type="text"
              name="message"
              value={message}
              onChange={({ target }) => setMessage(target.value)}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
