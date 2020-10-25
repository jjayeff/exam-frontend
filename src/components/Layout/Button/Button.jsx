import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

class Button extends React.Component {
  render() {
    const { children, onClick, type = 'primary', color = 'red' } = this.props;

    return (
      <button className={`btn ${type} ${color}`} onClick={onClick}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
