import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './App.css';
import Login from './pages/login';
import FriendPage from './pages/friendPage';

function App() {
  return (
    <CookiesProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/friends" component={FriendPage} />
      </Switch>
    </Router>
    </CookiesProvider>
  );
}

export default App;
