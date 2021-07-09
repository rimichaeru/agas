import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import styles from "./Test.module.scss";

const Test = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [messages, setMessages] = useState(null);
  const [messageFetchFailed, setMessageFetchFailed] = useState(false);

  // fetch messages
  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();
      fetch(config.resourceServer.messagesUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setMessages(data);
          setMessageFetchFailed(false);
        })
        .catch((err) => {
          setMessageFetchFailed(true);
          /* eslint-disable no-console */
          console.error(err);
        });
    }
  }, [authState]);

  return (
    <div>
      <h1>My Messages</h1>
      {messageFetchFailed && "FETCH FAILED"}
      {!messages && !messageFetchFailed && <p>Fetching Messages..</p>}
      {messages && (
        <div>
          <p>{messages.messages}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
