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

  // const { games } = props;

  const games = [
    {
      description: "eee",
      id: "402880917ab5e6f5017ab63183ce0000",
      properties: { a: "num-1", b: "num-2" },
      title: "bonk",
    },
    {
      description: "fff",
      id: "402880917ab8d578017ab9323c950000",
      properties: { a: "text-kjingienrg gerg", b: "flag-false" },
      title: "awesome",
    },
  ];

  const initGameId = window.location.search;
  const initialGame = initGameId.split("?id=")[1];

  const [selectedId, setSelectedId] = useState(initialGame);
  const [selectedGame, setSelectedGame] = useState(null);

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [propertyIds, setPropertyIds] = useState([]);
  const [actualRender, setActualRender] = useState([]);
  const history = useHistory();

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

      for (let i = 2; i < e.target.length; i++) {
        if (e.target[i].className == "submitButton") {
          console.log("found submit");
          break;
        }

        if ((i + 1) % 3 == 0) {
          propertyDictionary[e.target[i].value] =
            e.target[i + 1].value + "-" + e.target[i + 2].value;
        }
      }
      return propertyDictionary;
    };

    fetch(config.resourceServer.createGame, {
      method: "post",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target[0].value,
        description: e.target[1].value,
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
        console.log(data);
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
        {/* <select name="games" id="games" className={styles.gameSelect} onChange={(e) => history.push(e.target[e.target.selectedIndex].innerText + "?id=" + e.target[e.target.selectedIndex].value)}> */}
        <select
          name="games"
          id="games"
          className={styles.gameSelect}
          onChange={(e) =>
            setSelectedId(e.target[e.target.selectedIndex].value)
          }
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
          type="text"
          className={styles.title}
          id="title"
          name="title"
          defaultValue={selectedGame.title}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          rows="3"
          defaultValue={selectedGame.description}
        />
        <div className="propGrid">{actualRender}</div>
        <AddProp onClick={createProperty} />
        <input type="submit" className="submitButton" value="Update Game" />
      </form>
    </div>
  );
};

export default GameScreen;
