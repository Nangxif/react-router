import React, { Component } from 'react';
import { Consumer } from './context';
import { pathToRegexp } from 'path-to-regexp';

// Switch的作用就是匹配一个组件
export default class Switch extends Component {
  render() {
    return (
      <Consumer>
        {(state) => {
          let pathname = state.location.pathname;
          let children = this.props.children;
          for (var i = 0; i < children.length; i++) {
            let child = children[i];
            // redirect可能没有path属性
            let path = child.props.path || '';
            let reg = pathToRegexp(path, [], { end: false });
            if (reg.test(pathname)) {
              // 把匹配到的组件返回即可
              return child;
            }
          }
          return null;
        }}
      </Consumer>
    );
  }
}
