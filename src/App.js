import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div className="App-style-Fundo-main">
        <BrowserRouter>
          <Switch>
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/favorites" component={ Favorites } />
            <Route
              path="/album/:id"
              render={ (props) => <Album { ...props } id="1" /> }
            />
            <Route path="/search" component={ Search } />
            <Route exact path="/" component={ Login } />
            <Route exact path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
