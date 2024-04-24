import { ComponentPropsWithoutRef, useContext } from "react";
import { GameContext } from "../Context/GameContext";
import { ModalContext } from "../Context/ModalContext";
import { cn } from "../Utils/func";

const PlayAgain = ({
  inMenu = false,
  ...props
}: { inMenu?: boolean } & ComponentPropsWithoutRef<"button">) => {
  const { gameState, animationTiming, word, guessWord } =
    useContext(GameContext);
  const delay = (word.length + 1) * animationTiming;
  const isNewGame = guessWord.every((word) => word === "");

  const { isOpen } = useContext(ModalContext);

  return (
    <button
      {...props}
      className={cn(
        ` w-40 py-2  capitalize transition-opacity duration-300 delay-[${delay}ms] invisible text-white border border-white hover:bg-white/45 hover:text-black tracking-widest opacity-0  dark:bg-white/10 backdrop-blur-lg rounded-lg`,
        {
          "visible opacity-100": gameState !== "playing",
          "invisible transition-none": isOpen || isNewGame,
          "visible transition-none opacity-100 mt-4 w-2/5": inMenu,
        }
      )}
    >
      Play Again
    </button>
  );
};

export default PlayAgain;
