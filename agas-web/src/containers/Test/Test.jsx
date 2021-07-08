import React from "react";
import styles from "./Test.module.scss";

const Test = () => {
  

  const apiTest = () => {
    fetch("http://localhost:8080/test")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  };

  const apiLogin = () => {
    fetch("http://localhost:8080/login")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  };

  return (
    <>
      <h2>Backend Testing</h2>
      <button onClick={apiTest}>API Test</button>
      <button onClick={apiLogin}>API Login</button>
    </>
  );
};

export default Test;
