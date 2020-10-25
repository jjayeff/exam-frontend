import React from 'react';
import PropTypes from 'prop-types';
import './InputText.scss';

class InputText extends React.Component {
  render() {
    const { onChange, value, name } = this.props;

    return (
      <div className="input-components">
        <input
          type="text"
          name={name}
          value={value}
          onChange={(event) => onChange(event)}
          autoComplete="off"
        />
      </div>
    );
  }
}

InputText.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputText;
