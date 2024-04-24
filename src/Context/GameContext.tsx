type ContextType = {
  word: string;
  handleNewRound: () => void;
  usedLetters: string[];
  addLetter: (val: string, index: number) => void;
  guessWord: string[];
  turn: number;
  validateAttempt: (index: number) => void;
  gameState: GameStatus;
  animationTiming: number;
  isExploding: boolean;
};

const INITIAL_STATE = {
  word: "",
  handleNewRound: () => {},
  usedLetters: [],
  addLetter: () => {},
  guessWord: [],
  turn: 0,
  gameState: "playing" as GameStatus,
  validateAttempt: () => {},
  animationTiming: 300,
  isExploding: false,
};

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useRandomWord from "../Hooks/useRandomWord";
import { GameStatus } from "../Utils/types";
import { MOTS } from "../assets/wordlist";
import { ModalContext } from "./ModalContext";

export const GameContext = createContext<ContextType>(INITIAL_STATE);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { randomizeWord } = useRandomWord({ wordArray: MOTS });
  const { handleOpenModal, handleTypeChange } = useContext(ModalContext);
  const [word, setWord] = useState(randomizeWord());
  const [guessWord, setGuessWord] = useState([""]);
  const [turn, setTurn] = useState(0);
  const [gameState, setGameState] = useState<GameStatus>("playing");
  const [usedLetters, setUsedLetters] = useState([""]);
  const [isExploding, setIsExploding] = useState(false);
  const animationTiming = 400;

  const handleNewRound = useCallback(() => {
    const newWord = randomizeWord();
    setWord(newWord);
    setGuessWord([""]);
    setTurn(0);
    setGameState("playing");
    setIsExploding(false);
  }, [randomizeWord]);

  const addLetter = useCallback(
    (letter: string, index: number) => {
      if (gameState !== "playing") return;
      if (letter === "⌫") {
        setGuessWord((prev) => {
          const newGuessWords = [...prev];
          newGuessWords[index] = newGuessWords[index].slice(0, -1);
          return newGuessWords;
        });
        if (guessWord[index].length === 0) return;
        return;
      }
      if (guessWord[index].length !== word?.length)
        setGuessWord((prev) => {
          const newGuessWords = [...prev];
          newGuessWords[index] = newGuessWords[index] + letter;
          return newGuessWords;
        });
      if (usedLetters.includes(letter)) return;
      setUsedLetters((prev) => [...prev, letter]);
    },
    [guessWord, usedLetters, word.length]
  );
  const handleOpenExplosion = () => {
    setIsExploding(true);
  };

  const handleModal = (explode?: boolean) => {
    handleTypeChange("menu");
    explode
      ? handleOpenModal(
          (word.length + 1) * animationTiming,
          handleOpenExplosion
        )
      : handleOpenModal((word.length + 1) * animationTiming);
  };

  const validateAttempt = useCallback(
    (index: number) => {
      if (guessWord[turn].length !== word.length) return;
      setTurn((prev) => prev + 1);
      if (guessWord[index] === word) {
        setGameState("won");
        handleModal(true);
      } else if (turn === 5 && guessWord[index] !== word) {
        setGameState("lost");
        handleModal();
      } else {
        setGuessWord((prev) => [...prev, ""]);
      }
    },
    [guessWord, word, turn]
  );

  return (
    <GameContext.Provider
      value={{
        word,
        guessWord,
        turn,
        gameState,
        usedLetters,
        handleNewRound,
        addLetter,
        validateAttempt,
        animationTiming,
        isExploding,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
