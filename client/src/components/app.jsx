import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Details from './details.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <Router>
          <Route path="/books/:id" component={Details} />
        </Router>
      </div>
    )
  }
}

export default App;
