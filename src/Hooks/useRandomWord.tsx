import { useCallback } from "react";

const useRandomWord = ({ wordArray }: { wordArray: string[] }) => {
  const randomizeWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex];

    return randomWord;
  }, []);

  return { randomizeWord };
};

export default useRandomWord;
