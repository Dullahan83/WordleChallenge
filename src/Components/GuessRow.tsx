import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import GuessCell from "./GuessCell";

const GuessRow = ({ active, row }: { active: boolean; row: number }) => {
  const { word, guessWord, turn } = useContext(GameContext);
  const rowWord = guessWord[row];
  const arrColors: string[] = new Array(word.length).fill(" ");

  // const evalWord = (
  //   guess: string[],
  //   target: string[],
  //   result: string[],
  //   i: number,
  //   length: number
  // ) => {
  //   const temp = [...target];
  //   const tempGuess = guess && [...guess];
  //   if (!guess || i === length) return result;
  //   const usedLetter: string[] = [];
  //   target.map((_, n) => {
  //     if (guess[n] === target[n]) {
  //       console.log(guess[n], target[n]);
  //       result[n] = "green";
  //       console.log(result, i, row);
  //       temp[n] = "_";
  //       tempGuess[n] = "_";
  //       usedLetter.push(guess[n]);
  //     }
  //   });
  //   console.log(guess, row, result, usedLetter);
  //   const index = temp?.indexOf(guess[i]);
  //   const nGuess = tempGuess.filter((letter) => letter === guess[i]).length;
  //   const nTarget = temp.filter((letter) => letter === target[i]).length;
  //   if (index === -1 && result[i] === " ") {
  //     result[i] = "grey";
  //     guess[i] = "_";
  //     return evalWord(tempGuess, temp, result, i + 1, length);
  //   } else {
  //     if (target.includes(guess[i]) && result[i] !== "green") {
  //       // console.log(guess, target, result);

  //       result[i] = "yellow";

  //       guess[i] = "_";
  //       // target[index] = "_";
  //       return evalWord(tempGuess, temp, result, i + 1, length);
  //     }

  //     return evalWord(tempGuess, temp, result, i + 1, length);
  //   }
  // };
  const evalWord = (
    guess: string[],
    target: string[],
    result: string[],
    i = 0
  ) => {
    if (!guess || i === guess.length) return result;

    // Copie temporaire du mot cible pour garder trace des lettres déjà utilisées
    const tempTarget = [...target];

    // D'abord, identifier toutes les lettres bien placées
    guess.forEach((letter, index) => {
      if (letter === tempTarget[index]) {
        result[index] = "green";
        tempTarget[index] = "_"; // Marquer comme utilisée
        guess[index] = "_";
      }
    });

    // Ensuite, pour chaque lettre, déterminer si elle est mal placée
    guess.forEach((letter, index) => {
      if (letter !== "_") {
        const foundIndex = tempTarget.indexOf(letter);
        if (foundIndex !== -1) {
          result[index] = "yellow";
          tempTarget[foundIndex] = "_"; // Marquer comme utilisée
        } else {
          result[index] = "grey";
        }
      }
    });

    return result;
  };

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
