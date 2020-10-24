import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputText } from '../../../../components';
import './Sender.scss';

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
      <section className="sender container">
        <div className="sender-header">ชื่อของคุณ</div>
        <div className="sender-content">
          <InputText
            name="name"
            value={name}
            onChange={({ target }) => this.handleOnChange(target)}
          />
        </div>
        <div className="sender-footer">
          <Button onClick={this.onSubmitSenderName}>ยืนยัน</Button>
        </div>
      </section>
    );
  }
}

Sender.propTypes = {
  onChangeStateParent: PropTypes.func.isRequired,
};

export default Sender;
