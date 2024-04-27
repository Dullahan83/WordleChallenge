import { useContext, useEffect } from "react";
import { GameContext } from "../Context/GameContext";
import useSoundPlaying from "./useSoundPlaying";

const useKeyboard = () => {
  const {
    addLetter,
    validateAttempt,
    turn,
    gameState,
    guessWord,
    word,
    isTypingAllowed,
  } = useContext(GameContext);
  const { playSound } = useSoundPlaying();
  useEffect(() => {
    if (gameState !== "playing" || !isTypingAllowed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        /[a-zA-Z]/.test(e.key) &&
        e.key.length === 1 &&
        guessWord[turn].length < word.length
      ) {
        addLetter(e.key.toLowerCase(), turn);
        playSound("typing", 0);
      } else if (e.key === "Enter") {
        playSound("typing", 0);
        validateAttempt(turn);
      } else if (e.key === "Backspace" && guessWord[turn].length > 0) {
        // Handle backspace if necessary
        addLetter("⌫", turn);
        playSound("backspace", 0);
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
