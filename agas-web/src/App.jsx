import "./App.module.scss";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Nav from "./components/Nav";
import Routes from "./containers/Routes/Routes";
import "./App.scss";
import { Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useState } from "react";

// reference react-web https://github.com/okta/samples-js-react/tree/master/okta-hosted-login
// refence backend from react-web https://github.com/okta/samples-java-spring/tree/master/resource-server

const OKTA_TESTING_DISABLEHTTPSCHECK =
  process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

const config = {
  oidc: {
    clientId: "0oa160rwx4Zh6lzdt5d7",
    issuer: "https://dev-11037600.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: "http://localhost:8000/api/test",
  },
};

const oktaAuth = new OktaAuth(config.oidc);

// const CALLBACK_PATH = '/login/callback';

function App() {
  let history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Router>
        <Nav />
        <Routes />
      </Router>
    </Security>
  );
}

export default App;
