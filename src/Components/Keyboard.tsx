import useKeyboard from "../Hooks/useKeyboard";
import KeyboardRow from "./KeyboardRow";

const Keyboard = () => {
  useKeyboard();
  return (
    <div className="flex flex-col  items-center gap-2">
      <KeyboardRow keys={[..."azertyuiop"]} />
      <KeyboardRow keys={[..."qsdfghjklm"]} />
      <KeyboardRow keys={["⏎", ..."wxcvbn", "⌫"]} />
    </div>
  );
};

export default Keyboard;
