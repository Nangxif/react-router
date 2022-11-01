import React from 'react';
import ReactDOM from 'react-dom';
import {
  // HashRouter as Router,
  BroswerRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from './react-router-dom';
import Home from './Home.js';
import Profile from './Profile.js';
import User from './User.js';

ReactDOM.render(
  <Router>
    <div>
      <Link to="/home">首页</Link>
      <Link to="/profile">个人中心</Link>
      <Link to="/user">用户</Link>
    </div>
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/user" component={User} />
        <Redirect to="/home"></Redirect>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
