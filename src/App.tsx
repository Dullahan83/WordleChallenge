import "./App.css";
import GameBoard from "./Components/GameBoard";
import { GameProvider } from "./Context/GameContext";
import ModalContextProvider from "./Context/ModalContext";

function App() {
  return (
    <ModalContextProvider>
      <GameProvider>
        <GameBoard />
      </GameProvider>
    </ModalContextProvider>
  );
}

export default App;
