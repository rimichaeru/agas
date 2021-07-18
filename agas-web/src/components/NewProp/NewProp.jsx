import React, { useEffect, useState } from "react";
import styles from "./NewProp.module.scss";
import { MdCancel } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const NewProp = (props) => {
  const [type, setType] = useState("num");
  const [bgColour, setBgColour] = useState(styles.numColour);

  // previous props to display; name, type, value
  const prevPropArr = [];
  if (props.prevProperties) {
    // name
    prevPropArr.push(props.propertyId);

    const thisProps = props.prevProperties[props.propertyId];

    // type; text-, num-, flag- at [0]
    prevPropArr.push(thisProps.split("-")[0]);

    // value at [1]

    if (thisProps.includes("text-")) {
      prevPropArr.push(thisProps.split("text-")[1]);
    } else if (thisProps.includes("num-")) {
      prevPropArr.push(thisProps.split("num-")[1]);
    } else {
      prevPropArr.push(thisProps.split("flag-")[1]);
    }
  }

  useEffect(() => {
    if (prevPropArr.length) {
      setType(prevPropArr[1]);
    }
  }, []);

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
        defaultValue={prevPropArr.length ? prevPropArr[0] : ""}
        required
      />

      <select
        name="type"
        id="type"
        placeholder="Type"
        className={styles.type}
        onChange={(e) => setType(e.target.value)}
        defaultValue={prevPropArr.length ? prevPropArr[1] : ""}
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
          defaultValue={prevPropArr.length ? prevPropArr[2] : 0}
          required
        />
      ) : null}

      {type === "text" ? (
        <textarea
          type="text"
          name="text"
          placeholder="abc"
          className={styles.textValue}
          defaultValue={prevPropArr.length ? prevPropArr[2] : ""}
          required
        />
      ) : null}

      {type === "flag" ? (
        <select
          name="flag"
          id="flag"
          placeholder="Flag"
          className={styles.flagValue}
          defaultValue={prevPropArr.length ? prevPropArr[2] : true}
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
