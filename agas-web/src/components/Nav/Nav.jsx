import React, { useState, useEffect } from "react";
import styles from "./Nav.module.scss";
import { RiSettings5Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <p>{history.location.pathname}</p>
      <div className={styles.options}>
        <button onClick={() => history.push("/")}>Home</button>
        <button onClick={() => history.push("/test")}>Test</button>
        <button onClick={() => history.push("/utils")}>Utils</button>
        <button onClick={() => history.push("/game/create")}>Create Game</button>
        <button onClick={() => history.push("/player/create")}>Create Player</button>
        <button onClick={() => history.push("/profile")}>Profile</button>
        <RiSettings5Fill size="40" />
      </div>
    </div>
  );
};

export default Nav;
