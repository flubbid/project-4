import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';

class App extends Component {

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  render(){
    return (   
      <Router>
      <Switch>
      <Route exact path='/signup' render={({ history }) =>
        <SignupPage
          history={history}
          handleSignupOrLogin={this.handleSignupOrLogin}
        />
      } />
        <Route exact path='/' render={({ history }) =>
          <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        } />  
    </Switch></Router>
    )
  }
}
    

  
 

export default App;
