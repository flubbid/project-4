import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Redirect, BrowserRouter as Router, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';


import CreateQuiz from '../../components/Quiz/CreateQuiz';
import EditQuiz from '../../components/Quiz/EditQuiz';
import QuizList from '../../components/Quiz/QuizList';


class App extends Component {
  constructor(){
    super();
    this.state = {
      user: userService.getUser()
    };
  }

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

      <Route path ='/' exact component={QuizList} />
      <Route path ='/edit/:id' component={EditQuiz} />
      <Route path ='/create' component={CreateQuiz} />
      <Route exact path='/signup' render={({ history }) =>
        <SignupPage
          history={history}
          handleSignupOrLogin={this.handleSignupOrLogin}
        />
      } />
        <Route exact path='/login' render={({ history }) =>
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
