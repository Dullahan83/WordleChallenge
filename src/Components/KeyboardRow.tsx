import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import { KeyboardRowProps } from "../Utils/types";
import KeyboardCell from "./KeyboardCell";

const KeyboardRow = ({ keys }: KeyboardRowProps) => {
  const { addLetter, validateAttempt, turn, guessWord, word, gameState } =
    useContext(GameContext);

  const handleClick = (key: string) => {
    if (gameState !== "playing") return;
    if (key === "⏎") {
      if (guessWord[turn].length !== word.length) return;
      validateAttempt(turn);
      return;
    }
    addLetter(key, turn);
  };

  return (
    <div className="flex gap-1 sm:gap-2">
      {keys.map((keyChar, index) => {
        return (
          <KeyboardCell
            key={index}
            content={keyChar}
            onClick={() => handleClick(keyChar)}
          />
        );
      })}
    </div>
  );
};

export default KeyboardRow;
