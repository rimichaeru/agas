import React, { useState, useEffect } from "react";
import styles from "./Nav.module.scss";
import { RiSettings5Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Nav = () => {
  const history = useHistory();
  const [path, setPath] = useState("HOME");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const windowWidth = window.innerWidth;

  history.listen((location, action) => {
    setShowMobileMenu(false);
    if (location.pathname == "/") {
      setPath("HOME");
      return;
    }

    if (
      location.pathname.includes("/game/") &&
      !location.pathname.includes("/game/create")
    ) {
      const pathString = location.pathname.split("/game/").join("");
      const gameName = pathString.split("?id=")[0];

      setPath(gameName.toUpperCase());
      return;
    } else if (
      location.pathname.includes("/player/") &&
      !location.pathname.includes("/player/create")
    ) {
      const pathString = location.pathname.split("/player/").join("");
      const playerName = pathString.split("?id=")[0];

      setPath(playerName.toUpperCase());
      return;
    }

    const pathArray = location.pathname.split("/");

    const path =
      pathArray.length > 2
        ? pathArray[2].toUpperCase() + " " + pathArray[1].toUpperCase()
        : pathArray[1].toUpperCase();

    setPath(path);
  });

  const handleShowMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return windowWidth > 800 ? (
    <div className={styles.container}>
      <p className={styles.path}>{path}</p>

      <div className={styles.options}>
        <button onClick={() => history.push("/")}>Home</button>
        <button onClick={() => history.push("/test")}>Test</button>
        <button onClick={() => history.push("/utils")}>Utils</button>
        <button onClick={() => history.push("/game/create")}>
          Create Game
        </button>
        <button onClick={() => history.push("/player/create")}>
          Create Player
        </button>
        <button onClick={() => history.push("/profile")}>Profile</button>
        <RiSettings5Fill size="40" />
      </div>
    </div>
  ) : (
    <div className={styles.containerMobile}>
      <p className={styles.path}>{path}</p>
      <div
        className={
          showMobileMenu ? styles.optionsMobile : styles.optionsMobileHidden
        }
      >
        <p onClick={() => history.push("/")}>Home</p>
        <p onClick={() => history.push("/test")}>Test</p>
        <p onClick={() => history.push("/utils")}>Utils</p>
        <p onClick={() => history.push("/game/create")}>Create Game</p>
        <p onClick={() => history.push("/player/create")}>Create Player</p>
        <p onClick={() => history.push("/profile")}>Profile</p>
      </div>
      <GiHamburgerMenu
        className={styles.menu}
        onClick={handleShowMenu}
        size="36"
      />
    </div>
  );
};

export default Nav;
