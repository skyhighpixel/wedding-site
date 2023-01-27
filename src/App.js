import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import Rsvp from './Rsvp';


export default function App() {
    console.log('RENDER APP!')
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/rsvp">
            <Rsvp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
