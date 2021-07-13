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
    messagesUrl: "http://localhost:8080/api/test",
    createUser: "http://localhost:8080/api/user/create",
    createGame: "http://localhost:8080/api/game/create",
    createPlayer: "http://localhost:8080/api/player/create",
    getAllProfile: "http://localhost:8080/api/user/profile?token=",
  },
};
export default config;