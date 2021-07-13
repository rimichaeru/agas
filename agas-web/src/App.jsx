import "./App.module.scss";
import { useHistory } from "react-router-dom";
import Nav from "./components/Nav";
import Routes from "./containers/Routes/Routes";
import "./App.scss";
import { Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import config from "./oktaConfig";

// reference react-web https://github.com/okta/samples-js-react/tree/master/okta-hosted-login
// refence backend from react-web https://github.com/okta/samples-java-spring/tree/master/resource-server

const oktaAuth = new OktaAuth(config.oidc);

// const CALLBACK_PATH = '/login/callback';

// PROGRESSIVE WEB APP
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs

function App() {
  // history is async, handled with Router inside of index.js instead of here
  let history = useHistory();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Nav />
      <Routes />
    </Security>
  );
}

export default App;
