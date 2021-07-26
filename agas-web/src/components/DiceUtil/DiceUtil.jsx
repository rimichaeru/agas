import React, { useEffect, useState } from "react";
import styles from "./DiceUtil.module.scss";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const DiceUtil = () => {
  const [diceValue, setDiceValue] = useState("6");
  const [diceAmount, setDiceAmount] = useState("1");
  const [diceHistory, setDiceHistory] = useState([]); // arr of str
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

  const rollDice = (value, amount) => {
    const diceRolls = [];

    for (let i = 0; i < amount; i++) {
      diceRolls.push(Math.floor(Math.random() * value + 1));
    }

    const diceKey = {};
    for (let i = 0; i < diceRolls.length; i++) {
      // add key if it doesn't exist
      if (!Object.keys(diceKey).includes(String(diceRolls[i]))) {
        diceKey[diceRolls[i]] = 0;
      }

      // add to roll occurrence
      diceKey[diceRolls[i]] += 1;
    }

    let feedbackString = `${amount} D${value} = `;
    for (const roll in diceKey) {
      feedbackString += `${roll}s: ${diceKey[roll]} | `;
    }
    feedbackString = feedbackString.slice(0, feedbackString.length - 3);

    setDiceHistory((diceHistory) => [...diceHistory, feedbackString]);

    amount == 1
      ? alert(`You've rolled ${amount} D${value} = ${diceRolls[0]}`)
      : alert(`You've rolled ${feedbackString}`);
  };

  useEffect(() => {
    console.log(diceHistory);
  }, [diceHistory]);

  return (
    <div className={styles.container}>
      <div className={styles.diceValAmount}>
        <select
          name="dice"
          id="dice"
          onChange={(e) => setDiceValue(e.target.value)}
          className="selectUniversal"
          defaultValue={diceValue}
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
          onClick={(e) => e.target.select()}
          onChange={(e) => setDiceAmount(e.target.value)}
          defaultValue={diceAmount}
        />
        <button onClick={openModal}>History</button>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Results History"
        >
          <h4 className="modalSubtitle" style={{ marginBottom: 6 }}>
            Results History
          </h4>

          <FaRegWindowClose
            onClick={closeModal}
            size="30px"
            color="#ff0000"
            className="modalClose"
          />

          <div className={`${styles.modal} modalContainer`}>
            {diceHistory
              .slice(0)
              .reverse()
              .map((result, index) => {
                return (
                  <p>
                    <span className={styles.span}>{diceHistory.length - index}: </span>
                    {result}
                  </p>
                );
              })}
          </div>
        </Modal>
      </div>
      <GiPerspectiveDiceSixFacesRandom
        size="30px"
        color="rgb(197, 122, 0)"
        className={styles.rollButton}
        onClick={() => rollDice(diceValue, diceAmount)}
      />
    </div>
  );
};

export default DiceUtil;
