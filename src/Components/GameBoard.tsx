import { useContext } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { GameContext } from "../Context/GameContext";
import { ModalContext } from "../Context/ModalContext";
import GuessContainer from "./GuessContainer";
import HelpIcon from "./Icons/HelpIcon";
import Keyboard from "./Keyboard";
import Modal from "./Modal";
import PlayAgain from "./PlayAgain";

const GameBoard = () => {
  const { handleNewRound, isExploding } = useContext(GameContext);
  const { handleOpenModal, handleTypeChange } = useContext(ModalContext);

  const handleOpenRules = () => {
    handleTypeChange("rules");
    handleOpenModal(0);
  };

  return (
    <div className="flex flex-col items-center justify-around py-10 h-screen bg-dark text-white">
      <header className=" w-3/6 flex justify-center items-center relative">
        <HelpIcon
          color="#fff"
          className="h-fit absolute left-0"
          width="26px"
          height="26px"
          onClick={handleOpenRules}
        />

        <h1 className="text-4xl uppercase">Wordle</h1>
        <button className="size-4"></button>
      </header>
      <main className="w-full flex flex-col items-center justify-around flex-grow">
        <GuessContainer />
        <Keyboard />

        <PlayAgain onClick={handleNewRound} />
      </main>
      <Modal />
      {isExploding && (
        <div className="absolute top-1/2 left-1/2">
          <ConfettiExplosion
            force={0.8}
            duration={1500}
            particleCount={300}
            width={1600}
            height={"200vh"}
          />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
