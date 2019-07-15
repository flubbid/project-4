import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';


import CreateQuiz from '../../components/Quiz/CreateQuiz';
import QuizList from '../../components/Quiz/QuizList';


import { Provider } from 'react-redux';
import reducer from '../../store/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import history from '../../utils/history';
import NavBar from '../../components/NavBar/NavBar';

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
            <AppRoute path='/edit/:id' exact component={CreateQuiz} />
            <AppRoute path='/login' exact component={LoginPage} />
            <AppRoute path='/create' component={CreateQuiz} />
            <Route exact path='/signup' render={({ history }) =>
              <SignupPage
                history={history}
              />
            } />
          </Switch></Router>
      </Provider>
    )
  }
}
export default App;
