import React from 'react';
import PropTypes from 'prop-types';

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
      <section className="create-room">
        <div className="create-room-header">{header}</div>
        <input
          type="text"
          name="roomName"
          value={roomName}
          onChange={({ target }) => this.handleOnChange(target)}
          autoComplete="off"
        />
        <button onClick={this.onClickCancel}>กลับ</button>
        <button onClick={this.onSubmitRoomName}>ยืนยัน</button>
      </section>
    );
  }
}

CreateRoom.propTypes = {
  onChangeStateParent: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};

export default CreateRoom;
