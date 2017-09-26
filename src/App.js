import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import LoggedInHome from './components/logged_in_home_page/LoggedInHome';
import SearchResults from './components/search_results/SearchResults';
import TabResults from './components/tabs/TabResults';

class App extends Component {
  render() {
    return (
      <div>

        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/logged_in_home' component={ LoggedInHome } />
          <Route path='/search-results' component={ SearchResults } />
          <Route path='/tab-results' component={ TabResults } />
        </Switch>

      </div>   
    );
  }
}

export default App;
