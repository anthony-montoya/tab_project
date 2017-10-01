import './reset.css';
import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import SearchResults from './components/search_results/SearchResults';
import TabResults from './components/tabs/TabResults';
import Favorites from './components/favorites/Favorites';

class App extends Component {
  render() {
    return (
      <div>

        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/search-results' component={ SearchResults } />
          <Route path='/tab-results' component={ TabResults } />
          <Route path='/my-favorites' component={ Favorites } />
        </Switch>

      </div>   
    );
  }
}

export default App;
