import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Login from "./Login.js";
import Header from "../components/Header";
import Products from "../components/Products";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header username="Admin" />
        <Products />
      </div>
    );
  }
}

export default App;
