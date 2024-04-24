import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import GuessCell from "./GuessCell";

const GuessRow = ({ active, row }: { active: boolean; row: number }) => {
  const { word, guessWord, turn } = useContext(GameContext);
  const rowWord = guessWord[row] || [""];

  return (
    <div className="flex gap-1">
      {[...word]?.map((_, index) => {
        return (
          <GuessCell
            validated={active && row < turn}
            key={index}
            char={active ? rowWord[index] : " "}
            index={index}
            row={row}
          />
        );
      })}
    </div>
  );
};

export default GuessRow;
