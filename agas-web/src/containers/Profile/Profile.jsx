import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [renderPlayers, setRenderPlayers] = useState([]);
  const [renderGames, setRenderGames] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  const [allGameData, setAllGameData] = useState(null);
  const [allPlayerData, setAllPlayerData] = useState(null);

  const goToGameScreen = (title, id) => {
    history.push(`/game/${title + "?id=" + id}`);
  };

  const goToPlayerScreen = (name, id) => {
    history.push(`/player/${name + "?id=" + id}`);
  };

  const getProfilePlayers = (profileData) => {
    props.setPlayers(profileData.players);
    setRenderPlayers(
      profileData.players.map((player) => {
        return (
          <div
            className={styles.player}
            key={player.id}
            onClick={() => goToPlayerScreen(player.name, player.id)}
          >
            <h4>{player.name}</h4>
            <p>{player.game.title}</p>
          </div>
        );
      })
    );
  };

  const getGames = (userEmail) => {
    fetch(config.resourceServer.getGamesByOwner + userEmail, {
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllGameData(data);
        props.setGames(data);

        setRenderGames(
          data.map((game) => {
            return (
              <div
                className={styles.game}
                key={game.id}
                onClick={() => goToGameScreen(game.title, game.id)}
              >
                <div className={styles.details}>
                  <h4>{game.title}</h4>
                  <p>{game.description}</p>
                </div>

                <div className={styles.code}>
                  <p style={{ fontStyle: "italic" }}>Code:</p>
                  <p style={{ fontStyle: "italic" }}>{game.id}</p>
                </div>
              </div>
            );
          })
        );
      });
  };

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        getGames(info.email);

        fetch(config.resourceServer.getAllProfile + info.sub, {
          headers: {
            Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setAllPlayerData(data.players);
            getProfilePlayers(data);
          });
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  useEffect(() => {
    if (userInfo) {
      getGames(userInfo.email);
    }
  }, [refresh]);

  if (!userInfo) {
    return (
      <div className={styles.container}>
        <p>Loading Your Profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>PLAYERS</h2>
      <div className={styles.playerContainer}>
        {renderPlayers.length ? renderPlayers : "Please create a player!"}
      </div>

      <h2>GAMES</h2>
      <div className={styles.gameContainer}>
        {renderGames.length ? renderGames : "Please create or add a game!"}
      </div>
    </div>
  );
};

export default Profile;
