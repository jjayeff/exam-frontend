import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';

import './Error.scss';
import animationData from './Error.json';

export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animationBox = createRef();
  }

  componentDidMount() {
    lottie.loadAnimation({
      container: this.animationBox.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });
  }

  render() {
    return (
      <div className="Error">
        <div className="img" ref={this.animationBox} />
      </div>
    );
  }
}
