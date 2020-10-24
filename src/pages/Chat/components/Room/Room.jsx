import React from 'react';
import PropTypes from 'prop-types';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onSubmitSelectRoom = (value) => {
    const { onChangeStateParent } = this.props;
    onChangeStateParent({ name: 'step', value });
  };

  render() {
    const { name } = this.props;

    return (
      <section className="room">
        <div className="sender-header">ชื่อ {name}</div>
        <button onClick={() => this.onSubmitSelectRoom('createRoom')}>
          สร้างห้องใหม่
        </button>
        <button onClick={() => this.onSubmitSelectRoom('joinRoom')}>
          เข้าร่วมแชท
        </button>
      </section>
    );
  }
}

Room.propTypes = {
  onChangeStateParent: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Room;
