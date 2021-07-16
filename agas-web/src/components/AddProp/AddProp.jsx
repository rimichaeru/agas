import React from "react";
import styles from "./AddProp.module.scss";
import { BsPlusCircle } from "react-icons/bs";

const AddProp = (props) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <p>Add Property</p>
      <BsPlusCircle />
    </div>
  );
};

export default AddProp;
