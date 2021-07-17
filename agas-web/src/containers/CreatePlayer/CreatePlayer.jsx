import React, { useState, useEffect } from "react";
import styles from "./CreatePlayer.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import { useHistory } from "react-router-dom";

const CreatePlayer = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        getGames(info.email);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  useEffect(() => {
    if (userInfo) {
      getGames(userInfo.email);
    }
  }, [refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(config.resourceServer.createPlayer, {
      method: "post",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[1].value,
        user: {
          id: userInfo.email,
        },
        game: {
          id: gameList[e.target[0].selectedIndex][0],
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
        setGameList(
          data.map((game) => {
            return [game.id, game.title];
          })
        );
        console.log(data);
      });
  };

  const handleGameCode = (e) => {
    e.preventDefault();

    fetch(
      config.resourceServer.cloneGame +
        e.target[1].value +
        "&user=" +
        userInfo.email,
      {
        headers: {
          Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRefresh(!refresh);
      });
  };

  if (!userInfo) {
    return (
      <div className={styles.container}>
        <p>Setting up player...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleGameCode} className={styles.gameCode}>
        <button>Add Game Code</button>
        <input type="text" placeholder="Import Game Code" />
      </form>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label for="games">Select Game:</label>
        <select name="games" id="games">
          {gameList.length ? (
            gameList.map((game) => {
              return (
                <>
                  <option value={game[1]}>{game[1]}</option>
                </>
              );
            })
          ) : (
            <option value="create" onClick={() => history.push("/game/create")}>
              Create Game
            </option>
          )}
        </select>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <input type="submit" className="submitButton" value="Create Player" />
      </form>
    </div>
  );
};

export default CreatePlayer;
