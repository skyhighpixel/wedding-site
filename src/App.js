import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import Submissions from './Submissions';

export default function App() {
   
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/submissions">
            <Submissions />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
