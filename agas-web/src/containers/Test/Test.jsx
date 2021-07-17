import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import styles from "./Test.module.scss";

const Test = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
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

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const getGames = () => {
    fetch("http://localhost:8080/api/game/all", {
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  const createGame = () => {
    fetch(config.resourceServer.createGame, {
      method: "post",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test2",
        description: "test2",
        user_id: "conceptual@protonmail.com",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const getPlayers = () => {
    fetch("http://localhost:8080/api/player/all", {
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  const createPlayer = () => {
    fetch(config.resourceServer.createPlayer, {
      method: "post",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const getUsers = () => {
    fetch("http://localhost:8080/api/user/all", {
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const localhostTest = () => {
    fetch("http://localhost:8080/api/game/owner?owner=conceptual@protonmail.com", {
      // method: "post",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   firstName: "Ingba",
      //   lastName: "Bongbo",
      //   age: 35,
      //   course: {
      //     id: 1,
      //   },
      // }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Test Bed</h1>
      {messageFetchFailed && "FETCH FAILED"}
      {!messages && !messageFetchFailed && <p>Fetching Messages..</p>}
      {messages && (
        <div>
          <p>{messages.messages}</p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button onClick={getUsers}>Get users</button>
        <button onClick={getGames}>Get games</button>
        <button onClick={getPlayers}>Get players</button>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={createGame}>Create game</button>
        <button onClick={createPlayer}>Create player</button>
        <button onClick={localhostTest}>Localhost</button>
      </div>
    </div>
  );
};

export default Test;
