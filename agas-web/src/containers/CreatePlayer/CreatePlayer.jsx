import React, { useState, useEffect } from "react";
import styles from "./CreatePlayer.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";

const CreatePlayer = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

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

  if (!userInfo) {
    return (
      <div>
        <p>Setting up game...</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(config.resourceServer.createPlayer, {
      method: "post",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[0].value,
        user: {
          id: userInfo.email,
        // ADD GAME LINK
        },
      }),
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <input type="submit" className="submitButton" value="Create Player" />
      </form>
    </div>
  );
};

export default CreatePlayer;
