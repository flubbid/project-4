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
      <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
        <Link to ='/' className='navbar-brand'>Quzzical</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
             <Link to='/' className="nav-Link">Quiz's</Link>
            </li>
            <li className="navbar-item">
             <Link to='/create' className="nav-Link">Create Quiz</Link>
            </li>
          </ul>
        </div>
      </nav>
      
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
