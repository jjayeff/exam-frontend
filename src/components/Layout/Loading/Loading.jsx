import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';

import './Loading.scss';
import animationData from './Loading.json';

export default class Loading extends Component {
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
      <div className="Loading">
        <div className="img" ref={this.animationBox} />
      </div>
    );
  }
}
