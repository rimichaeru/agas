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
            username: info.email,
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

  // const accessToken = authState.accessToken; // access token for APIs
  // const response = await fetch(url, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  const login = async () => {
    oktaAuth.signInWithRedirect({ originalUri: "/" });
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>PKCE Flow w/ Okta Hosted Login Page</h1>

        {authState.isAuthenticated && !userInfo && (
          <div>Loading user information...</div>
        )}

        {authState.isAuthenticated && userInfo && (
          <div>
            <p>
              Welcome, &nbsp;
              {userInfo.name}!
            </p>
            <p>
              You have successfully authenticated against your Okta org, and
              have been redirected back to this application. You now have an ID
              token and access token in local storage. Visit the{" "}
              <a href="/profile">My Profile</a> page to take a look inside the
              ID token.
            </p>
            <h3>Next Steps</h3>
            <p>
              Currently this application is a stand-alone front end application.
              At this point you can use the access token to authenticate
              yourself against resource servers that you control.
            </p>
            <p>
              This sample is designed to work with one of our resource server
              examples. To see access token authentication in action, please
              download one of these resource server examples:
            </p>
            <ul>
              <li>Resource Examples</li>
            </ul>
            <p>
              Once you have downloaded and started the example resource server,
              you can visit the <a href="/messages"> My Messages</a> page to see
              the authentication process in action.
            </p>
          </div>
        )}

        {!authState.isAuthenticated && (
          <div>
            <p>
              If you&lsquo;re viewing this page then you have successfully
              started this React application.
            </p>
            <p>
              <span>This example shows you how to use the </span>
              <a href="https://github.com/okta/okta-react/tree/master">
                Okta React Library
              </a>
              <span> to add the </span>
              <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">
                PKCE Flow
              </a>
              <span> to your application.</span>
            </p>
            <p>
              When you click the login button below, you will be redirected to
              the login page on your Okta org. After you authenticate, you will
              be returned to this application with an ID token and access token.
              These tokens will be stored in local storage and can be retrieved
              at a later time.
            </p>
            <button id="login-button" primary onClick={login}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
