export type GameStatus = "playing" | "won" | "lost";

export type GuessCellProps = {
  char: string;
  validated: boolean;
  index: number;
  row: number;
  color: string;
};

export type KeyboardRowProps = {
  keys: string[];
};

export type KeyboardHookProps = {
  action: (key: string, index: number) => void;
  index: number;
  enterAction: (index: number) => void;
};
