import React, { useState, useEffect } from "react";
import styles from "./GameScreen.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import AddProp from "../../components/AddProp/AddProp";
import NewProp from "../../components/NewProp/NewProp";
import { useHistory } from "react-router-dom";

// props are: all current games (for easy switching, if title becomes game dropdown)
// propertyIds
const GameScreen = (props) => {
  const { games } = props;
  const history = useHistory();

  // redirect to profile, if no information
  if (!games) {
    history.push("/profile");
  }

  const initGameId = window.location.search;
  const initialGame = initGameId.split("?id=")[1];

  const [selectedId, setSelectedId] = useState(initialGame);
  const [selectedGame, setSelectedGame] = useState(null);

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [propertyIds, setPropertyIds] = useState([]);
  const [actualRender, setActualRender] = useState([]);

  useEffect(() => {
    if (!selectedId) {
      return;
    }
    // set up game to render, its prop ids, and actual render

    // set selected game
    games.forEach((game) => {
      if (game.id == selectedId) {
        setSelectedGame(game);

        history.push(game.title + "?id=" + selectedId);
        // properties not a random number like in createGame
        // now the prop name is the id; must be unique
        setPropertyIds(Object.keys(game.properties));
      }
    });
  }, [selectedId]);

  const deleteProperty = (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    setPropertyIds(
      propertyIds.filter((property) => {
        return property != propertyId;
      })
    );
  };

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

  useEffect(() => {
    // render from selectedId > Game > propIds
    setActualRender(
      propertyIds.map((propertyId, index) => {
        return (
          <NewProp
            key={propertyId + index + selectedGame.id}
            propertyId={propertyId}
            deleteProperty={deleteProperty}
            prevProperties={selectedGame.properties}
          />
        );
      })
    );
  }, [propertyIds, selectedGame]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const getPropsForDB = () => {
      // form could have many fields, target 0 and 1 are title and description
      // must include all fields without knowing the limit
      // Each property is in 3s; fieldname, type, value

      let propertyDictionary = {};

      for (let i = 3; i < e.target.length; i++) {
        if (e.target[i].className == "submitButton") {
          break;
        }

        if (i % 3 == 0) {
          propertyDictionary[e.target[i].value] =
            e.target[i + 1].value + "-" + e.target[i + 2].value;
        }
      }

      return propertyDictionary;
    };

    fetch(config.resourceServer.updateGame + "?gameId=" + selectedId, {
      method: "put",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target[1].value,
        description: e.target[2].value,
        properties: getPropsForDB(),
        owner: {
          id: userInfo.email,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });

    alert("Game has been updated!");
  };

  const createProperty = () => {
    if (propertyIds.length >= 60) {
      alert("Too many properties, please keep under 60!");
      return;
    }

    let existingProps = [...propertyIds];

    const idExists = (propId) => {
      if (propertyIds.includes(propId)) {
        return true;
      } else {
        return false;
      }
    };

    let propId = Math.floor(Math.random() * 10000);
    while (idExists(propId)) {
      propId = Math.floor(Math.random() * 10000);
    }

    existingProps.push(propId);
    setPropertyIds(existingProps);
  };

  if (!selectedGame) {
    return (
      <div className={styles.container}>
        <p>Loading your game...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        onInvalid={() => {}}
      >
        <label htmlFor="title">Title</label>
        <select
          name="games"
          id="games"
          className={`${styles.gameSelect} selectUniversal`}
          onChange={(e) =>
            setSelectedId(e.target[e.target.selectedIndex].value)
          }
          value={selectedGame.id}
        >
          {games.length ? (
            games.map((game) => {
              return <option value={game.id}>{game.title}</option>;
            })
          ) : (
            <option value="create" onClick={() => history.push("/game/create")}>
              Create Game
            </option>
          )}
        </select>
        <input
          key={selectedGame.id}
          type="text"
          className={styles.title}
          id="title"
          name="title"
          defaultValue={selectedGame.title}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          key={selectedGame.id}
          type="text"
          id="description"
          name="description"
          rows="3"
          defaultValue={selectedGame.description}
        />
        <div className="propGrid">{actualRender}</div>
        <AddProp onClick={createProperty} />
        <input type="submit" className="submitButton" value="Save Game" />
      </form>
    </div>
  );
};

export default GameScreen;
