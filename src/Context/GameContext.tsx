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
  isTypingAllowed: boolean;
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
  isTypingAllowed: true,
};

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useRandomWord from "../Hooks/useRandomWord";
import useSoundPlaying from "../Hooks/useSoundPlaying";
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
  const [isTypingAllowed, setIsTypingAllowed] = useState(true);
  const animationTiming = 300;

  const { playSound } = useSoundPlaying();
  useEffect(() => {
    console.log(`Pour ne pas paraître nul, tapez: ${word}`);
  }, [word]);

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
      if (gameState !== "playing" || !isTypingAllowed) return;
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

  const verifyLetterState = (letter: string, index: number) => {
    let letterState = "";
    if (!word.includes(letter)) {
      letterState = "absent";
    } else if (word[index] === letter) {
      letterState = "correct";
    } else letterState = "incorrect";
    return letterState;
  };

  const handleLetterSounds = () => {
    for (let i = 0; i < guessWord[turn].length; i++) {
      const letter = guessWord[turn][i];
      playSound(verifyLetterState(letter, i), (i + 1) * animationTiming);
    }
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
      setIsTypingAllowed(false);
      handleLetterSounds();
      setTimeout(() => {
        if (guessWord[index] === word) {
          setGameState("won");
          handleModal(true);
          playSound("won", 0);
        } else if (turn === 5 && guessWord[index] !== word) {
          setGameState("lost");
          handleModal();
          playSound("lost", 0);
        } else {
          setGuessWord((prev) => [...prev, ""]);
        }
        setIsTypingAllowed(true);
      }, (word.length + 1) * animationTiming);
      setTurn((prev) => prev + 1);
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
        isTypingAllowed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
