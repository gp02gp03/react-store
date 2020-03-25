import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "pages/App.js";
import Login from "pages/Login.js";
import NotFound from "pages/NotFound.js";
import Cart from "pages/Cart";
import Register from "pages/Register";

class Router extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/login" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route path="/register" component={Register} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        ;
      </div>
    );
  }
  // eslint-disable-next-line no-unused-expressions
}

export default Router;
