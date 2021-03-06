import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";
import "./App.scss";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);
// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./pages/registration/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./pages/registration/Register"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./pages/registration/Page404"),
  loading
});

const Page500 = Loadable({
  loader: () => import("./pages/registration/Page500"),
  loading
});

const ForgotPasswd = Loadable({
  loader: () => import("./pages/registration/ForgotPasswd/ForgotPasswd"),
  loading
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" name="Login Page" component={Login} />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route
            exact
            path="/forgot-passwd"
            name="Forgot Passwd"
            component={ForgotPasswd}
          />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
