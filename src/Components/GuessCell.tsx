import { ComponentPropsWithoutRef, useContext } from "react";
import { GameContext } from "../Context/GameContext";
import { cn } from "../Utils/func";
import { GuessCellProps } from "../Utils/types";

const GuessCell = ({
  char,
  validated,
  index,
  row,
  color,
}: GuessCellProps & ComponentPropsWithoutRef<"span">) => {
  const { word, guessWord, turn, gameState, animationTiming } =
    useContext(GameContext);

  const maxDelay = `${(word.length + 1) * animationTiming}`;
  const delay =
    turn === row ? `${maxDelay}` : `${(index + 1) * animationTiming}`;
  const isNewGame = guessWord.every((word) => word === "");

  return (
    <span
      style={{
        animationDelay: `${(index + 1) * animationTiming}ms`,
        animationDuration: `${animationTiming}ms`,
      }}
      className={cn(
        `flex size-14 uppercase text-2xl bg-inherit transition-colors duration-[${animationTiming}ms] delay-[${delay}ms]  animate-jump rounded-lg border  justify-center items-center  border-gray-300 `,
        {
          "bg-white/15": color === "grey",
          "bg-yellow-500 ": color === "yellow",
          "bg-green-500": color === "green",
          "bg-inherit animate-none  duration-0 border-gray-300/30": !validated,
          "bg-slate-300 duration-200 border-gray-300 text-black":
            turn === row && gameState === "playing",
          "duration-0 delay-0 animate-none": isNewGame,
        }
      )}
    >
      {char}
    </span>
  );
};

export default GuessCell;
