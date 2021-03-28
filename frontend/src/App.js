import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './App.css';
import Login from './pages/login';
import FriendPage from './pages/friendPage';
import FeedPage from './pages/feedPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <CookiesProvider>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/friends" component={FriendPage} />
          <Route exact path="/feed" component={FeedPage} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
