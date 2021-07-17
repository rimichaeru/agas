import React, { useState, useEffect } from "react";
import styles from "./CreateGame.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import { useHistory } from "react-router-dom";
import AddProp from "../../components/AddProp/AddProp";
import NewProp from "../../components/NewProp/NewProp";

const CreateGame = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const history = useHistory();

  const [propertyIds, setPropertyIds] = useState([]);
  const [actualRender, setActualRender] = useState([]);

  const deleteProperty = (propertyId) => {
    // propertyId is unique ID
    console.log(propertyId);

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
    setActualRender(
      propertyIds.map((propertyId) => {
        return (
          <NewProp
            key={propertyId}
            propertyId={propertyId}
            deleteProperty={deleteProperty}
          />
        );
      })
    );
  }, [propertyIds]);

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

        if ((i+1) % 3 == 0) {
          propertyDictionary[e.target[i].value] = e.target[i+1].value + "-" + e.target[i+2].value;
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

    history.push("/player/create");
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

  if (!userInfo) {
    return (
      <div className={styles.container}>
        <p>Setting up game...</p>
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
        <input
          type="text"
          className={styles.title}
          id="title"
          name="title"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea type="text" id="description" name="description" rows="3" />
        <div className="propGrid">{actualRender}</div>
        <AddProp onClick={createProperty} />
        <input type="submit" className="submitButton" value="Create Game" />
      </form>
    </div>
  );
};

export default CreateGame;
