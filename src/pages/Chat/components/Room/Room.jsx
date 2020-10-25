import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../components';
import './Room.scss';

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
      <section className="room container">
        <div className="room-header">คุณ {name}</div>
        <div className="room-content">
          <Button onClick={() => this.onSubmitSelectRoom('createRoom')}>
            สร้างห้องใหม่
          </Button>
        </div>
        <Button onClick={() => this.onSubmitSelectRoom('joinRoom')} type="text">
          เข้าร่วมแชท
        </Button>
      </section>
    );
  }
}

Room.propTypes = {
  onChangeStateParent: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Room;
