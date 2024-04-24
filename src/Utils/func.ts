import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isUsedLetter = (
  usedLetters: string[],
  turn: number,
  guessWord: string[],
  content: string
) => {
  if (!usedLetters.includes(content) || turn === 0) return;
  const isUsed = guessWord.some((guess, t) => {
    return [...guess].some((letter) => {
      if (letter === content && guess.includes(content) && t < turn) {
        return true;
      }
      return false;
    });
  });
  return isUsed;
};
export const isValidLetter = (
  usedLetters: string[],
  turn: number,
  guessWord: string[],
  content: string,
  word: string
) => {
  if (!usedLetters.includes(content)) return;
  const isValid = guessWord.some((guess, t) => {
    return [...guess].some(
      (letter, i) => letter === content && word[i] === guess[i] && t < turn
    );
  });
  return isValid;
};
