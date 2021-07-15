import React, { useState, useEffect } from "react";
import styles from "./CreateGame.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";

const CreateGame = () => {
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

    console.log(userInfo.email);

    fetch(config.resourceServer.createGame, {
      method: "post",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target[0].value,
        description: e.target[1].value,
        owner: {
          id: userInfo.email,
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
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="description">Description</label>
        <textarea type="text" id="description" name="description" rows="5" />
        <input type="submit" className="submitButton" value="Create Game" />
      </form>
    </div>
  );
};

export default CreateGame;
