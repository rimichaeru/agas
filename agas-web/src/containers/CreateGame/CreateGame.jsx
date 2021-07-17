import React, { useState, useEffect } from "react";
import styles from "./CreateGame.module.scss";
import { useOktaAuth } from "@okta/okta-react";
import config from "../../oktaConfig";
import { useHistory } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import AddProp from "../../components/AddProp/AddProp";
import NewProp from "../../components/NewProp/NewProp";

let internalPropKey = 0;

const CreateGame = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const history = useHistory();

  const [propertiesRender, setPropertiesRender] = useState([]);

  const deleteProperty = (index) => {
    console.log("dataKey, index: ", index);
    console.log("internal: ", internalPropKey);
    console.log(propertiesRender);

    // let existingProps = [...propertiesRender];
    // existingProps.splice(index, 1);
    // setPropertiesRender(existingProps);
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

  if (!userInfo) {
    return (
      <div>
        <p>Setting up game...</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const getPropsForDB = () => {
      return {};
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
    let existingProps = [...propertiesRender];
    console.log("create prop, exist:", existingProps);

    internalPropKey++;
    console.log("increase internal to: ", internalPropKey);

    existingProps = existingProps.concat([
      <NewProp
        key={internalPropKey}
        dataKey={propertiesRender.length}
        deleteProperty={deleteProperty}
      />,
    ]);
    setPropertiesRender(existingProps);
  };

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
        <div className="propGrid">{propertiesRender}</div>
        <AddProp onClick={createProperty} />
        <input type="submit" className="submitButton" value="Create Game" />
      </form>
    </div>
  );
};

export default CreateGame;
