import React from "react";
import styles from "./Test.module.scss";

const Test = () => {
  
  const apiTest = () => {
    fetch("http://localhost:8080/api/test")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  };

  return (
    <div className={styles.container}>
      <h2>Backend Testing</h2>
      <button onClick={apiTest}>API Test</button>
    </div>
  );
};

export default Test;
