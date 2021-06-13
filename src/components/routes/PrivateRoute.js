import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import MainFrame from "../MainFrame/MainFrame";
class PrivateRoute extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
  };
  componentDidMount() {
    try {
      let email = localStorage.getItem("email");
      let isLogin = localStorage.getItem("isLogin");
      console.log(email, isLogin);
      if (email && isLogin) {
        this.setState({ isAuthenticated: true });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.isAuthenticating) {
      return null;
    }

    return this.state.isAuthenticated ? (
      <>
      <MainFrame/>
      <Route {...rest} render={props => (
           <Component {...props} />
            )}/>   
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default PrivateRoute;
