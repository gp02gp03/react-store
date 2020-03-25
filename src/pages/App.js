import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Login from "./Login.js";
import Header from "../components/Header";
import Products from "../components/Products";
import Layout from "../../src/Layout";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Products />
        </Layout>
      </div>
    );
  }
}

export default App;
