// import { useEffect } from "react";
// import { KeyboardHookProps } from "../Utils/types";

// const useKeyboard = ({ action, index, enterAction }: KeyboardHookProps) => {
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       e.stopImmediatePropagation();
//       if (/[a-zA-Z]/.test(e.key) && e.key.length === 1) {
//         action(e.key, index);
//         return;
//       }
//       if (e.key == "Enter") {
//         enterAction(index);
//         return;
//       } else if (e.key === "Backspace") {
//         action("⌫", index);
//         return;
//       }
//       return;
//     };

//     document.addEventListener("keydown", handleKeyDown);

//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [index]);
// };

// export default useKeyboard;

import { useContext, useEffect } from "react";
import { GameContext } from "../Context/GameContext";

const useKeyboard = () => {
  const { addLetter, validateAttempt, turn, gameState } =
    useContext(GameContext);

  useEffect(() => {
    if (gameState !== "playing") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[a-zA-Z]/.test(e.key) && e.key.length === 1) {
        addLetter(e.key.toLowerCase(), turn);
      } else if (e.key === "Enter") {
        validateAttempt(turn);
      } else if (e.key === "Backspace") {
        // Handle backspace if necessary
        addLetter("⌫", turn);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addLetter, validateAttempt, turn]);

  return null; // Since this is a hook for side effects, it does not need to return anything.
};

export default useKeyboard;
