import { useState } from "react";
import { GameStatus } from "../Utils/types";

const useGame = ({ word }: { word?: string }) => {
  const [turn, setTurn] = useState(0);
  const [guessWord, setGuessWord] = useState([""]);
  const [usedLetters, setUsedLetters] = useState([""]);
  const [gameState, setGameState] = useState<GameStatus>("playing");

  const addLetter = (char: string, index: number) => {
    if (gameState !== "playing") {
      return;
    }
    if (char === "⌫") {
      setGuessWord((prev) => {
        const newGuessWords = [...prev];
        newGuessWords[index] = newGuessWords[index].slice(0, -1);
        return newGuessWords;
      });
      if (guessWord[index].length === 0) return;
      setUsedLetters((prev) => prev.slice(0, -1));
      return;
    }
    if (guessWord[index].length + 1 === word?.length)
      setGuessWord((prev) => {
        const newGuessWords = [...prev];
        newGuessWords[index] += char;
        return newGuessWords;
      });
    if (usedLetters.includes(char)) return;
    setUsedLetters((prev) => [...prev, char]);
  };

  const handleValidateAttempt = (index: number) => {
    if (gameState !== "playing") {
      return;
    }
    if (guessWord[index] === word) {
      setGameState("won");
      return;
    }
    if (turn === 5 && guessWord[index] !== word) {
      setGameState("lost");
      return;
    }
    setTurn((prev) => prev + 1);
    setGuessWord((prev) => {
      const newGuessWords = [...prev];
      newGuessWords.push("");
      return newGuessWords;
    });
  };

  return {
    turn,
    guessWord,
    handleValidateAttempt,
    usedLetters,
    addLetter,
    gameState,
    setGameState,
  };
};

export default useGame;
