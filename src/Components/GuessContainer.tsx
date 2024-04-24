import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import GuessRow from "./GuessRow";

const GuessContainer = () => {
  const { turn } = useContext(GameContext);
  return (
    <section id="#guess" className="flex flex-col gap-2">
      {new Array(6).fill("").map((_, index) => {
        return <GuessRow row={index} key={index} active={index <= turn} />;
      })}
    </section>
  );
};

export default GuessContainer;
