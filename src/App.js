import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import Header from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/forms/Profile';
import LoginForm from './components/forms/LoginForm';
import SignupForm from './components/forms/SignupForm';

const App = ({ session }) => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        {session && <Route path='/profile/:id' exact component={Profile} />}
        {session && <Route path='/dashboard/:id' exact component={Dashboard} />}
        {!session && <Route path='/login' exact component={LoginForm} />}
        {!session && <Route path='/signup' exact component={SignupForm} />}
        <Route path='*' component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = ({ session }) => {
  return { session };
};

export default connect(mapStateToProps, null)(App);
