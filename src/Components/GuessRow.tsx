import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import { evalWord } from "../Utils/func";
import GuessCell from "./GuessCell";

const GuessRow = ({ active, row }: { active: boolean; row: number }) => {
  const { word, guessWord, turn } = useContext(GameContext);
  const rowWord = guessWord[row];

  const arrColors: string[] = new Array(word.length).fill(" ");

  evalWord(rowWord?.split(""), word.split(""), arrColors, 0);

  return (
    <div className="flex gap-1">
      {[...word]?.map((_, index) => {
        return (
          <GuessCell
            validated={active && row < turn}
            key={index}
            char={active && rowWord ? rowWord[index] : " "}
            index={index}
            row={row}
            color={arrColors[index]}
          />
        );
      })}
    </div>
  );
};

export default GuessRow;
