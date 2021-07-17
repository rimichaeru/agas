import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [renderPlayers, setRenderPlayers] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [renderGames, setRenderGames] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getProfilePlayers = (profileData) => {
    setRenderPlayers(
      profileData.players.map((player) => {
        return (
          <div className={styles.player} key={player.id}>
            <h4>{player.name}</h4>
            <p>{player.game.title}</p>
          </div>
        );
      })
    );
  };

  // const getProfileGames = (profileData) => {
  //   const uniqueGamesList = [];
  //   const gameIDList = [];

  //   profileData.players.map((player) => {
  //     if (!gameIDList.includes(player.game.id)) {
  //       uniqueGamesList.push(player.game);
  //       gameIDList.push(player.game.id);
  //     }
  //   });

  //   setRenderGames(
  //     uniqueGamesList.map((game) => {
  //       return (
  //         <div className={styles.game} key={game.title}>
  //           <h4>{game.title}</h4>
  //           <p>{game.description}</p>
  //         </div>
  //       );
  //     })
  //   );
  // };

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
        setRenderGames(
          data.map((game) => {
            return (
              <div className={styles.game} key={game.title}>
                <h4>{game.title}</h4>
                <p>{game.description}</p>
                <p style={{fontStyle: "italic"}}>ID: {game.id}</p>
              </div>
            );
          })
        );
        console.log(data);
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
            console.log(data);
            getProfilePlayers(data);
            // getProfileGames(data);
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
