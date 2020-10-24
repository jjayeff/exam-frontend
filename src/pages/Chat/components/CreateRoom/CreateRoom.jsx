import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputText } from '../../../../components';
import './CreateRoom.scss';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
    };
  }

  handleOnChange = ({ name, value }) => this.setState({ [name]: value });

  onSubmitRoomName = () => {
    const { onChangeStateParent } = this.props;
    const { roomName } = this.state;
    onChangeStateParent({ name: 'roomName', value: roomName });
    onChangeStateParent({ name: 'step', value: 'chatRoom' });
  };

  onClickCancel = () => {
    const { onChangeStateParent } = this.props;
    onChangeStateParent({ name: 'step', value: 'room' });
  };

  render() {
    const { header } = this.props;
    const { roomName } = this.state;

    return (
      <section className="create-room container">
        <div className="create-room-header">{header}</div>
        <div className="create-room-content">
          <InputText
            name="roomName"
            value={roomName}
            onChange={({ target }) => this.handleOnChange(target)}
          />
        </div>
        <div className="create-room-footer">
          <Button onClick={this.onClickCancel} type="text">
            กลับ
          </Button>
          <Button onClick={this.onSubmitRoomName}>ยืนยัน</Button>
        </div>
      </section>
    );
  }
}

CreateRoom.propTypes = {
  onChangeStateParent: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};

export default CreateRoom;
