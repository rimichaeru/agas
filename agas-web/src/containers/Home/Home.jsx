import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null); // userInfo has the logged-in user information

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);

        // Save user in DB if not already
        fetch(config.resourceServer.createUser, {
          method: "post",
          headers: {
            Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: info.email,
            uniqueToken: info.sub,
            givenName: info.given_name,
            familyName: info.family_name,
            username: info.preferred_username,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });

        console.log(info);
      });
    }
  }, [authState, oktaAuth]);

  // tokens can be renewed by hitting the /authorize endpoint. See Get a new access token/ID token silently for your SPA+ https://developer.okta.com/docs/guides/refresh-tokens/get-refresh-token/#get-a-new-access-token-id-token-silently-for-your-spa

  const login = async () => {
    oktaAuth.signInWithRedirect({ originalUri: "/" });
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>AGAS</h1>

      {authState.isAuthenticated && !userInfo && (
        <p>Loading user information...</p>
      )}

      {authState.isAuthenticated && userInfo && (
        <div>
          <p>
            Welcome, &nbsp;
            {userInfo.name}!
          </p>
          <p>
            <a href="/profile">My Profile</a>
            <br />
            <a href="/game/create">Create Game</a>
            <br />
            <a href="/player/create">Create Player</a>
            <br />
          </p>
        </div>
      )}

      {!authState.isAuthenticated && (
        <div>
          <p>Welcome to Any Game Any Score!</p>
          <p>
            {" "}
            Login to create a game profile to keep track of ANY GAME (Tennis,
            DnD, Monopoly, etc.) and, if needed, create custom PLAYER profiles
            for those games, too!{" "}
          </p>
          
          <button id="login-button" primary onClick={login}>
            Login
          </button>
        </div>
      )}

      <div className={styles.bars}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
};

export default Home;
