import { ComponentPropsWithoutRef, useContext } from "react";
import { GameContext } from "../Context/GameContext";
import { cn, isUsedLetter, isValidLetter } from "../Utils/func";
type KeyboardCellProps = {
  content: string;
} & ComponentPropsWithoutRef<"button">;
const KeyboardCell = ({ content, ...props }: KeyboardCellProps) => {
  const { word, usedLetters, turn, guessWord, animationTiming } =
    useContext(GameContext);

  const isValid = isValidLetter(usedLetters, turn, guessWord, content, word);
  const isUsed = isUsedLetter(usedLetters, turn, guessWord, content);
  const delay = `${
    (guessWord[turn - 1]?.indexOf(content) + 1) * animationTiming
  }`;
  return (
    <button
      {...props}
      className={cn(
        `size-[34px] sm:size-14 origin-center relative uppercase group hover:delay-0 hover:duration-150 hover:bg-current/15 overflow-clip group active:scale-[98.5%] text-base sm:text-2xl bg-inherit rounded-lg transition-colors duration-[${animationTiming}ms] delay-[${delay}ms] border text-center place-content-center border-gray-300`,
        {
          "bg-yellow-500 ": isUsed,
          "bg-green-500": isValid,
          "bg-white/15": isUsed && !word.includes(content),
          "bg-inherit": !usedLetters.includes(content) || turn === 0,
        }
      )}
    >
      {content}
    </button>
  );
};

export default KeyboardCell;
