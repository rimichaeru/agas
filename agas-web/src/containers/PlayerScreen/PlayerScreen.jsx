import React, { useState, useEffect } from "react";
import styles from "./PlayerScreen.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import AddProp from "../../components/AddProp/AddProp";
import NewProp from "../../components/NewProp/NewProp";
import { useHistory } from "react-router-dom";

// props are: all current players (for easy switching, if name becomes player dropdown)
// propertyIds
const PlayerScreen = (props) => {
  const { players } = props;
  const history = useHistory();

  // redirect to profile, if no information
  if (!players) {
    history.push("/profile")
  }

  const initPlayerId = window.location.search;
  const initialPlayer = initPlayerId.split("?id=")[1];

  const [selectedId, setSelectedId] = useState(initialPlayer);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [propertyIds, setPropertyIds] = useState([]);
  const [actualRender, setActualRender] = useState([]);
  

  useEffect(() => {
    if (!selectedId) {
      return;
    }
    // set up player to render, its prop ids, and actual render

    // set selected player
    players.forEach((player) => {
      console.log(players);
      if (player.id == selectedId) {
        setSelectedPlayer(player);

        history.push(player.name + "?id=" + selectedId);
        // properties not a random number like in createPlayer
        // now the prop name is the id; must be unique
        setPropertyIds(Object.keys(player.properties));
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
    // render from selectedId > Player > propIds
    setActualRender(
      propertyIds.map((propertyId, index) => {
        return (
          <NewProp
            key={propertyId + index + selectedPlayer.id}
            propertyId={propertyId}
            deleteProperty={deleteProperty}
            prevProperties={selectedPlayer.properties}
          />
        );
      })
    );
  }, [propertyIds, selectedPlayer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const getPropsForDB = () => {
      // form could have many fields, target 0 and 1 are name and description
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

      console.log(propertyDictionary);
      return propertyDictionary;
    };

    fetch(config.resourceServer.updatePlayer + "?playerId=" + Number(selectedId), {
      method: "put",
      headers: {
        Authorization: `Bearer ${oktaAuth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[1].value,
        // description: e.target[2].value, no desc on player
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

    alert("Player has been updated!");
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

  if (!selectedPlayer) {
    return (
      <div className={styles.container}>
        <p>Loading your player...</p>
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
        <label htmlFor="name">Name</label>
        <select
          name="players"
          id="players"
          className={styles.playerSelect}
          onChange={(e) =>
            setSelectedId(e.target[e.target.selectedIndex].value)
          }
          value={selectedPlayer.id}
        >
          {players.length ? (
            players.map((player) => {
              return <option value={player.id}>{player.name}</option>;
            })
          ) : (
            <option
              value="create"
              onClick={() => history.push("/player/create")}
            >
              Create Player
            </option>
          )}
        </select>
        <input
          key={selectedPlayer.id}
          type="text"
          className={styles.name}
          id="name"
          name="name"
          defaultValue={selectedPlayer.name}
          required
        />
        {/* <label htmlFor="description">Description</label>
        <textarea
          key={selectedPlayer.id}
          type="text"
          id="description"
          name="description"
          rows="3"
          defaultValue={selectedPlayer.description}
        /> */}
        <div className="propGrid">{actualRender}</div>
        <AddProp onClick={createProperty} />
        <input type="submit" className="submitButton" value="Save Player" />
      </form>
    </div>
  );
};

export default PlayerScreen;
