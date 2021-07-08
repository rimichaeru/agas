import "./App.module.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Routes from "./containers/Routes/Routes";
import "./App.scss";
import { Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";

// reference react-web https://github.com/okta/samples-js-react/tree/master/okta-hosted-login 
// refence backend from react-web https://github.com/okta/samples-java-spring/tree/master/resource-server 

const config = {
  clientId: "0oa160rwx4Zh6lzdt5d7",
  issuer: "https://dev-11037600.okta.com/oauth2/default",
  redirectUri: "http://localhost:8080/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

const oktaAuth = new OktaAuth(config);

// const CALLBACK_PATH = '/login/callback';

function App() {
  return (
    <Security oktaAuth={oktaAuth}>
      <Router>
        <Nav />
        <Routes />
        {/* <Route path={CALLBACK_PATH} component={LoginCallback} /> */}
      </Router>
    </Security>
  );
}

export default App;
