import { Provider } from 'react-redux';
import { store } from './store';

import React, { useEffect } from 'react';
import './main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/home/Home';
import Header from './components/layout/Header';
import Vocabulary from './components/pages/vocabulary/Vocabulary';
import EditForm from './components/layout/EditForm';
import WordList from './components/pages/wordList/WordList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/auth/PrivateRoute';
import { loadUser, loginCheck } from './actions/auth'; 
import Conjugation from './components/pages/conjugation/Conjugation';




if (localStorage.token) {
  setAuthToken(localStorage.token);
} 

const App = () => {
  useEffect(() => {
     store.dispatch(loadUser());
     store.dispatch(loginCheck());
  }, [])
  
  return (
    <Provider store={store}>
      <Router>
        <div className="window">
          <Header />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/vocabulary' component={Vocabulary} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/vocabulary/:title' component={WordList} />
            <PrivateRoute exact path='/add-words/:title' component={EditForm} />
            <PrivateRoute exact path='/conjugation' component={Conjugation} />

          </Switch>

          </div>

      </Router>
    </Provider>
  );
}

export default App;
