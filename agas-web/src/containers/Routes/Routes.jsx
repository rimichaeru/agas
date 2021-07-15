import React from "react";
import styles from "./Routes.module.scss";
import Home from "../Home";
import { Switch, Route } from "react-router-dom";
import { LoginCallback, SecureRoute } from "@okta/okta-react";
import Test from "../Test";
import Utils from "../Utils";
import UserProfile from "../UserProfile";
import CreateGame from "../CreateGame";
import CreatePlayer from "../CreatePlayer";
import GameScreen from "../GameScreen";
import PlayerScreen from "../PlayerScreen";
import Profile from "../Profile";

// Use SecureRoute from okta-react for AUTH-ONLY areas

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/utils">
        <Utils />
      </Route>
      <Route path="/game/create">
        <CreateGame />
      </Route>
      <Route path="/game/:gameid">
        <GameScreen />
      </Route>
      <Route path="/player/create">
        <CreatePlayer />
      </Route>
      <Route path="/player/:playerid">
        <PlayerScreen />
      </Route>
      <SecureRoute path="/test">
        <Test />
      </SecureRoute>
      <Route path="/login/callback" component={LoginCallback} />
      <SecureRoute path="/user-profile" component={UserProfile} />
      <SecureRoute path="/profile" component={Profile} />
    </Switch>
  );
};

export default Routes;
