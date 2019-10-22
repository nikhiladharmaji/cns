import React, { Component } from "react";

import firebase from "./components/firebase";
import "./App.css";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";

class App extends Component {
  state = {};
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Switch location={this.props.location}>
          <Route
            exact
            path="/"
            render={props =>
              !this.state.isLoggedIn ? (
                <Login {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/bucket", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/bucket"
            render={props =>
              this.state.isLoggedIn ? (
                <Main {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/", state: { from: props.location } }}
                />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
