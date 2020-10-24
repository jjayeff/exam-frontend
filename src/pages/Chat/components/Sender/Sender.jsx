import React from 'react';
import PropTypes from 'prop-types';

class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleOnChange = ({ name, value }) => this.setState({ [name]: value });

  onSubmitSenderName = () => {
    const { onChangeStateParent } = this.props;
    const { name } = this.state;
    onChangeStateParent({ name: 'name', value: name });
    onChangeStateParent({ name: 'step', value: 'room' });
  };

  render() {
    const { name } = this.state;

    return (
      <section className="sender">
        <div className="sender-header">ชื่อของคุณ</div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={({ target }) => this.handleOnChange(target)}
          autoComplete="off"
        />
        <button onClick={this.onSubmitSenderName}>ยืนยัน</button>
      </section>
    );
  }
}

Sender.propTypes = {
  onChangeStateParent: PropTypes.func.isRequired,
};

export default Sender;
