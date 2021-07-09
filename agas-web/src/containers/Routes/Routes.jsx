import React from "react";
import styles from "./Routes.module.scss";
import Home from "../Home";
import { Switch, Route } from "react-router-dom";
import { LoginCallback, SecureRoute } from "@okta/okta-react";
import Test from "../Test";
import Utils from "../Utils";
import UserProfile from "../UserProfile";

// Use SecureRoute from okta-react for AUTH-only areas

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/utils">
        <Utils />
      </Route>
      <SecureRoute path="/test">
        <Test />
      </SecureRoute>
      <Route path="/login/callback" component={LoginCallback} />
      <SecureRoute path="/profile" component={UserProfile} />
    </Switch>
  );
};

export default Routes;
