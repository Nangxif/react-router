import React, { Component } from 'react';
import { Provider } from './context';

export default class BroswerRouter extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        pathname: window.location.pathname || '/',
      },
    };
  }
  componentDidMount() {
    // 监听pathname值变化，重新设置状态
    var _wr = function (type) {
      var orig = window.history[type];
      return function () {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
      };
    };
    window.history.pushState = _wr('pushState');

    window.addEventListener('pushState', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.pathname || '/',
        },
      });
    });
    // 默认hash没有时跳转到/
    window.history.pushState(
      { path: window.location.pathname || '/' },
      null,
      window.location.pathname || '/'
    );
  }
  render() {
    let value = {
      location: this.state.location,
      history: {
        push(to) {
          window.history.pushState({ path: to }, null, to);
        },
      },
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}
