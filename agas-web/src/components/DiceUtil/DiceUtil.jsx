import React, { useState } from "react";
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
  const [diceHistory, setDiceHistory] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  let subtitle;

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

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
        <button onClick={openModal}>Results</button>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Results History"
        >
          <h4 className="modalSubtitle">Results</h4>

          <FaRegWindowClose
            onClick={closeModal}
            size="30px"
            color="#ff0000"
            className="modalClose"
          />

          <div className="modalContainer"></div>
        </Modal>
      </div>
      <GiPerspectiveDiceSixFacesRandom size="30px" color="rgb(197, 122, 0)" />
    </div>
  );
};

export default DiceUtil;
