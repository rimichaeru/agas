import React, { useState, useEffect } from "react";
import styles from "./Nav.module.scss";
import { RiSettings5Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();

  const [path, setPath] = useState(
    history.location.pathname.charAt(1).toUpperCase() +
      history.location.pathname.slice(2)
  );

  useEffect(() => {
    setPath(
      history.location.pathname.charAt(1).toUpperCase() +
        history.location.pathname.slice(2)
    );
  }, []);

  return (
    <div className={styles.container}>
      <p>{path > 1 ? path : "Home"}</p>
      <div className={styles.options}>
        <button onClick={() => history.push("/")}>Home</button>
        <RiSettings5Fill size="40" />
      </div>
    </div>
  );
};

export default Nav;
