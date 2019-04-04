/* eslint-disable import/extensions */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Header from './header.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/books/:id" component={Header} />
        </Router>
      </div>
    );
  }
}

export default App;
