import React from "react";
import styles from "./Nav.module.scss";
import { RiSettings5Fill } from "react-icons/ri";

const Nav = () => {
  return (
    <div className={styles.container}>
      <p>Info</p>
      <div className={styles.options}>
        <button>New</button>
        <RiSettings5Fill size="40" />
      </div>
    </div>
  );
};

export default Nav;
