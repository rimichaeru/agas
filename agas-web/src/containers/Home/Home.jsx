import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { useOktaAuth } from "@okta/okta-react";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null); // userInfo has the logged-in user information

  const accessToken = authState.accessToken; // access token for APIs
  // tokens can be renewed by hitting the /authorize endpoint. See Get a new access token/ID token silently for your SPA+ https://developer.okta.com/docs/guides/refresh-tokens/get-refresh-token/#get-a-new-access-token-id-token-silently-for-your-spa

  // const response = await fetch(url, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/profile" });

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUserInfo().then((info) => {
        setUserInfo(info);
        console.log(accessToken);
        console.log(userInfo);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <a onClick={login}>Login</a>
      </div>
    );
  }
};

export default Home;
