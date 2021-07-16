import React, { useState } from "react";
import styles from "./NewProp.module.scss";

const NewProp = () => {
  const [type, setType] = useState("num");

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Name" className={styles.name} />

      <select
        name="type"
        id="type"
        placeholder="Type"
        className={styles.type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="num">Num</option>
        <option value="text">Text</option>
        <option value="true">True</option>
      </select>

      {type === "num" ? (
        <input
          type="text"
          name="num"
          placeholder="#"
          className={styles.value}
        />
      ) : null}

      {type === "text" ? (
        <input
          type="text"
          name="text"
          placeholder="..."
          className={styles.value}
        />
      ) : null}

      {type === "true" ? (
        // <div className={styles.trueContainer}>
          <select
            name="true"
            id="true"
            placeholder="True"
            className={styles.true}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        // </div>
      ) : null}

      <div className={styles.fixed}>
        <label htmlFor="fixed">Fixed?</label>
        <input type="checkbox" name="fixed" id="fixed" />
      </div>
    </div>
  );
};

export default NewProp;
