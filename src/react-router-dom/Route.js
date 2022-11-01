import React, { Component } from 'react';
import { Consumer } from './context';
import { pathToRegexp } from 'path-to-regexp';

export default class Route extends Component {
  render() {
    return (
      <Consumer>
        {(state) => {
          let { path, component: Component, exact = false } = this.props;
          let pathname = state.location.pathname;
          //   根据path实现一个正则 通过正则匹配
          let keys = [];
          let reg = pathToRegexp(path, keys, { end: exact });
          keys = keys.map((item) => item.name);
          let result = pathname.match(reg);
          let [url, ...values] = result || [];
          let props = {
            location: state.location,
            history: state.history,
            match: {
              params: keys.reduce((obj, current, idx) => {
                obj[current] = values[idx];
                return obj;
              }, {}),
            },
            
          };
          if (result) {
            return <Component {...props}></Component>;
          }
          return null;
        }}
      </Consumer>
      // <Consumer>
      //   {(state) => {
      //     let { path, component: Component, exact = false } = this.props;
      //     let pathname = state.location.pathname;
      //     //   根据path实现一个正则 通过正则匹配
      //     let reg = pathToRegexp(path, [], { end: exact });
      //     let result = pathname.match(reg);
      //     let props = {
      //       location: state.location,
      //       history: state.history,
      //     };
      //     if (result) {
      //       return <Component {...props}></Component>;
      //     }
      //     return null;
      //   }}
      // </Consumer>
      // <Consumer>
      //   {(state) => {
      //     let { path, component: Component } = this.props;
      //     let pathname = state.location.pathname;
      //     let props = {
      //       location: state.location,
      //       history: state.history,
      //     };
      //     if (pathname === path) {
      //       return <Component {...props}></Component>;
      //     }
      //     return null;
      //   }}
      // </Consumer>
    );
  }
}
