import React, { useEffect, useState } from "react";
import styles from "./NewProp.module.scss";
import { MdCancel } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const NewProp = (props) => {
  const [type, setType] = useState("num");
  const [bgColour, setBgColour] = useState(styles.numColour);

  useEffect(() => {
    if (type == "num") {
      setBgColour(styles.numColour);
    } else if (type == "text") {
      setBgColour(styles.textColour);
    } else {
      setBgColour(styles.flagColour);
    }
  }, [type]);

  return (
    <div className={`${styles.container} ${bgColour}`}>
      {/* <MdCancel size="18px" color="red" cursor="pointer" /> */}
      <FcCancel
        size="18px"
        cursor="pointer"
        className={styles.cancel}
        onClick={() => props.deleteProperty(props.propertyId)}
      />

      <input
        type="text"
        placeholder="Name"
        className={type == "text" ? styles.textName : styles.name}
        required
      />

      <select
        name="type"
        id="type"
        placeholder="Type"
        className={styles.type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="num">Num</option>
        <option value="text">Text</option>
        <option value="flag">Flag</option>
      </select>

      {type === "num" ? (
        <input
          type="number"
          step="any"
          name="num"
          placeholder="#"
          className={styles.numValue}
          onClick={(e) => e.target.select()}
          defaultValue={0}
          required
        />
      ) : null}

      {type === "text" ? (
        <textarea
          type="text"
          name="text"
          placeholder="abc"
          className={styles.textValue}
          required
        />
      ) : null}

      {type === "flag" ? (
        <select
          name="flag"
          id="flag"
          placeholder="Flag"
          className={styles.flagValue}
          required
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      ) : null}

      {/* For freezing the property so that it cannot be altered */}
      {/* <div className={styles.fixed}>
        <label htmlFor="fixed">Fixed?</label>
        <input type="checkbox" name="fixed" id="fixed" />
      </div> */}
    </div>
  );
};

export default NewProp;
