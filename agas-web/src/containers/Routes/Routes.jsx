import React, { useState } from "react";
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
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/utils">
        <Utils />
      </Route>
      <SecureRoute exact path="/game/create">
        <CreateGame />
      </SecureRoute>
      <SecureRoute path="/game/:gameid">
        <GameScreen games={games} />
      </SecureRoute>
      <SecureRoute exact path="/player/create">
        <CreatePlayer setGames={setGames} />
      </SecureRoute>
      <SecureRoute path="/player/:playerid">
        <PlayerScreen players={players} />
      </SecureRoute>
      <SecureRoute path="/test">
        <Test />
      </SecureRoute>
      <Route path="/login/callback" component={LoginCallback} />
      <SecureRoute path="/user-profile" component={UserProfile} />
      <SecureRoute path="/profile">
        <Profile setGames={setGames} setPlayers={setPlayers} />
      </SecureRoute>
    </Switch>
  );
};

export default Routes;
