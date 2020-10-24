import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const QUERY_MESSAGES = gql`
  query {
    messages(roomName: "room1") {
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
      message: $message
      sender: { name: $name }
    ) {
      successful
    }
  }
`;

const ChatRoom = (props) => {
  const [message, setMessage] = useState('');
  const { loading, error, data } = useQuery(QUERY_MESSAGES);
  const { name, roomName } = props;
  const [sendMessage] = useMutation(MUTATION_SEND_MESSAGE);

  const onSubmitMessage = (event) => {
    event.preventDefault();
    sendMessage({ variables: { name, roomName, message } });
    setMessage('');
  };

  const renderMessages = () => {
    const { messages } = data;
    return messages.map((message) => (
      <div className="message-box" key={message.id}>
        <div className="sender-name">คุณ {message.from.name}</div>
        <div className="message-content">{message.body}</div>
      </div>
    ));
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error...</h1>;

  return (
    <section className="chat-room">
      <div className="chat-room-header">ห้อง {roomName}</div>
      <div className="chat-room-content">{renderMessages()}</div>
      <div className="chat-room-footer">
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
    </section>
  );
};

export default ChatRoom;
