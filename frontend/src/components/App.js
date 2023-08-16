import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
} from "react-router-dom";
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
       <div className="top-middle">
          <HomePage></HomePage>
        </div>    
       </Router>
    ); 
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);