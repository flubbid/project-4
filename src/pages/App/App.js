import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';


import EditQuiz from '../../components/Quiz/EditQuiz';
import QuizList from '../../components/Quiz/QuizList';


import { Provider } from 'react-redux';
import reducer from '../../store/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import history from '../../utils/history';
import NavBar from '../../components/NavBar/NavBar';
import QuizQuestions from '../../components/Quiz/QuizQuestions';
import Quiz from '../../components/Quiz/Quiz';

const store = createStore(reducer, applyMiddleware(thunk));

const AppRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={matchProps => (
    <div>
      <NavBar />
      <main>
        <div className="container pt-4">
          <Component {...matchProps} />
        </div>
      </main>
    </div>
  )} />
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <AppRoute path='/' exact component={QuizList} />
            <AppRoute path='/quiz/:id' exact component={Quiz} />
            <AppRoute path='/edit/:id' exact component={EditQuiz} />
            <AppRoute path='/edit/:id/questions' exact component={QuizQuestions} />
            <AppRoute path='/login' exact component={LoginPage} />
            <AppRoute path='/create' component={EditQuiz} />
            <AppRoute path='/signup' component={SignupPage} />
          </Switch></Router>
      </Provider>
    )
  }
}





export default App;
