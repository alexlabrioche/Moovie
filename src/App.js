import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Discover from './components/Discover';
import MyList from './components/MyList';
import Popular from './components/Popular';
import NavBar from './components/NavBar';

import './bootstrap.min.css';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  };
  render() {
    // console.info("@app movies", this.state.movies)
    return(
      <div>
        <Router>
        <NavBar />
            <Route exact path="/discover/" component={Discover} />
            <Route movies={this.state.movies} exact path="/" component={Popular} />
            <Route exact path="/my-list/" component={MyList} />
        </Router>
      </div>
    );
  };
};

export default App;
