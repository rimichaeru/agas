import React, { useEffect, useState } from "react";
import styles from "./Utils.module.scss";
import Dice from "../../components/Dice";

const Utils = () => {
  const [utilView, setUtilView] = useState("dice");
  const [utilRender, setUtilRender] = useState([]);
  const [diceValue, setDiceValue] = useState(6);
  const [diceAmount, setDiceAmount] = useState(1);

  // useEffect(() => {
  //   setUtilRender(<Dice value={diceValue} amount={diceAmount} />);
  // }, [diceValue, diceRender]);

  return (
    <div className={styles.container}>
      <div className={styles.utilOptions}>
        <div className={styles.dice}>
          <label htmlFor="dice">Dice</label>
          <select
            name="dice"
            id="dice"
            onChange={(e) => setDiceValue(e.target.value)}
          >
            <option value="4">D4</option>
            <option value="6">D6</option>
            <option value="8">D8</option>
            <option value="10">D10</option>
            <option value="12">D12</option>
            <option value="20">D20</option>
            <option value="50">D50</option>
            <option value="100">D100</option>
          </select>
          <input
            type="text"
            placeholder="Amount"
            onChange={(e) => setDiceAmount(e.target.value)}
          />
        </div>
        <button>Calc</button>
      </div>
      <div className={styles.utilView}>{utilRender}</div>
    </div>
  );
};

export default Utils;
