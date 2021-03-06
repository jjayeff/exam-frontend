import React from 'react';
import { Sender, Room, CreateRoom, ChatRoom } from './components';
import './Chat.scss';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'sender',
      name: '',
      roomName: '',
    };
  }

  handleOnChange = ({ name, value }) => this.setState({ [name]: value });

  renderStep = () => {
    const { step, name, roomName } = this.state;
    switch (step) {
      case 'sender':
        return <Sender onChangeStateParent={this.handleOnChange} />;
      case 'room':
        return <Room name={name} onChangeStateParent={this.handleOnChange} />;
      case 'createRoom':
        return (
          <CreateRoom
            header="สร้างห้องใหม่"
            step={step}
            onChangeStateParent={this.handleOnChange}
          />
        );
      case 'joinRoom':
        return (
          <CreateRoom
            header="เข้าร่วมแชท"
            step={step}
            onChangeStateParent={this.handleOnChange}
          />
        );
      case 'chatRoom':
        return <ChatRoom name={name} roomName={roomName} />;
    }
  };

  render() {
    return <section className="app chat">{this.renderStep()}</section>;
  }
}

export default Chat;
