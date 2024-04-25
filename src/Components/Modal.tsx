import { useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { GameContext } from "../Context/GameContext";
import { ModalContext } from "../Context/ModalContext";
// import useOnClickOutside from "../Hooks/useOnOutsideClick";
import { cn } from "../Utils/func";
import CloseIcon from "./Icons/CloseIcon";
import PlayAgain from "./PlayAgain";
import Trophy from "./Trophy";

const Modal = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dialogBodyRef = useRef<HTMLDivElement | null>(null);
  const { modalType, handleCloseModal } = useContext(ModalContext);

  // useOnClickOutside(dialogBodyRef, handleCloseModal);

  return createPortal(
    <dialog
      id="modal"
      ref={dialogRef}
      className="min-w-full min-h-screen hidden open:flex open:flex-col items-center justify-center fixed bg-black/75 top-0 left-0"
    >
      <div
        ref={dialogBodyRef}
        className={cn(
          `px-8 text-sm tracking-wider text-center relative py-6 bg-black border-4 rounded-xl max-w-[60cqw] xl:max-w-[40cqw] gap-2 border-white min-w-[30cqw] min-h-[20cqh] flex flex-col items-center text-white`,
          {
            "min-w-[400px] max-w-[20cqw] ": modalType === "menu",
          }
        )}
      >
        {modalType === "rules" ? <RulesModal /> : <GameStateModal />}
        <CloseIcon
          className=" size-8 flex items-center justify-center rounded-lg border border-white absolute top-4 right-4"
          color="#fff"
          onClick={handleCloseModal}
        />
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;

const RulesModal = () => {
  const arr1 = [..."virer"];

  return (
    <>
      <h1 className="text-white w-fit text-2xl uppercase mb-4">Rules</h1>
      <p className="text-white w-fit  mb-4">
        The goal of the game is to find the hidden word within the given number
        of attempts.
      </p>
      <p className="text-white w-fit mb-4">
        Each guess must be of the correct length. After each guess, you will
        receive feedback indicating which letters are in the word and in the
        correct position, which letters are in the word but in the wrong
        position, and which letters are not in the word at all.
      </p>
      <p className="text-white w-fit mb-4">
        You can use the on-screen keyboard to enter your guesses, or you can
        type them directly into the input field. To submit a guess, press the
        "Enter" key or click the "Submit" button.
      </p>
      <div className="flex flex-col w-full items-center gap-2 my-2">
        <div className="flex items-center gap-2">
          {arr1.map((char, index) => {
            return (
              <div
                key={index}
                className={cn(
                  `inline-block size-14 uppercase text-2xl bg-white/30  rounded-lg border text-center place-content-center border-gray-300`
                )}
              >
                {char}
              </div>
            );
          })}
        </div>
        <p className="text-white w-fit text-lg">
          None of the letters are present in the word to guess
        </p>
      </div>
      <div className="flex flex-col w-full items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          {arr1.map((char, index) => {
            return (
              <div
                key={index}
                className={cn(
                  `inline-block size-14 uppercase text-2xl bg-white/30  rounded-lg border text-center place-content-center border-gray-300`,
                  { "bg-green-500": index === 3 }
                )}
              >
                {char}
              </div>
            );
          })}
        </div>
        <p className="text-white w-fit text-lg">
          The letter <strong>E</strong> is in the correct position
        </p>
      </div>
      <div className="flex flex-col w-full items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          {arr1.map((char, index) => {
            return (
              <div
                key={index}
                className={cn(
                  `inline-block size-14 uppercase text-2xl bg-white/30 rounded-lg border text-center place-content-center border-gray-300`,
                  { "bg-yellow-500": index === 3 }
                )}
              >
                {char}
              </div>
            );
          })}
        </div>
        <p className="text-white text-lg w-fit ">
          The letter <strong>E</strong> is a correct letter but is in the wrong
          position
        </p>
      </div>
      <p className="text-white w-fit mb-4">
        The game is over when you have found the hidden word or have run out of
        attempts. Good luck!
      </p>
    </>
  );
};

const GameStateModal = () => {
  const { gameState, word, handleNewRound } = useContext(GameContext);
  const { handleCloseModal } = useContext(ModalContext);

  const handleClick = () => {
    handleCloseModal();
    handleNewRound();
  };

  return (
    <>
      <h1 className="text-white w-fit text-2xl uppercase mb-4 ">
        {gameState === "lost" ? "Game Over" : "You Won"}
      </h1>
      {gameState === "won" && (
        <>
          <Trophy />
          <p className="text-lg mt-4">
            The word to find was: {word.toUpperCase()}
          </p>
        </>
      )}
      {gameState === "lost" && (
        <>
          <svg
            fill="#fff"
            height="100px"
            width="100px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M156.1,377.967l-57.344,57.344c-1.784,1.783-2.688,4.267-2.466,6.784s1.553,4.804,3.627,6.255 c6.903,4.796,11.017,12.638,11.017,20.983c0,14.114-11.486,25.6-25.6,25.6s-25.6-11.486-25.6-25.6 c0-2.347,0.427-4.796,1.348-7.706c0.964-3.038,0.154-6.357-2.099-8.619c-2.253-2.244-5.564-3.055-8.619-2.091 c-2.901,0.922-5.342,1.348-7.697,1.348c-14.114,0-25.6-11.486-25.6-25.6s11.486-25.6,25.6-25.6 c8.337,0,16.179,4.122,20.983,11.017c1.451,2.074,3.738,3.405,6.255,3.627c2.517,0.196,5-0.683,6.784-2.466l40.277-40.277 c3.336-3.337,3.336-8.73,0-12.066c-3.337-3.336-8.73-3.336-12.066,0l-33.911,33.911C63.258,387.925,53.197,384,42.667,384 C19.14,384,0,403.14,0,426.667s19.14,42.667,42.667,42.667c0,23.526,19.14,42.667,42.667,42.667 C108.86,512,128,492.86,128,469.333c0-10.53-3.925-20.591-10.812-28.322l50.978-50.978c3.336-3.336,3.336-8.73,0-12.066 C164.83,374.63,159.437,374.63,156.1,377.967z"></path>{" "}
                    <path d="M368.7,121.233l44.544-44.544c1.784-1.784,2.688-4.267,2.466-6.784c-0.23-2.517-1.553-4.804-3.627-6.255 c-6.904-4.796-11.017-12.638-11.017-20.983c0-14.114,11.486-25.6,25.6-25.6s25.6,11.486,25.6,25.6 c0,2.338-0.427,4.796-1.357,7.706c-0.956,3.046-0.145,6.357,2.108,8.619c2.261,2.253,5.581,3.072,8.619,2.091 c2.893-0.922,5.342-1.348,7.697-1.348c14.114,0,25.6,11.486,25.6,25.6s-11.486,25.6-25.6,25.6 c-8.337,0-16.179-4.122-20.983-11.017c-1.451-2.074-3.738-3.396-6.255-3.627c-2.56-0.213-5.001,0.683-6.784,2.466L390.767,143.3 c-3.337,3.336-3.337,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5l38.178-38.178 c7.731,6.886,17.792,10.812,28.322,10.812C492.86,128,512,108.86,512,85.333c0-23.526-19.14-42.667-42.667-42.667 C469.333,19.14,450.193,0,426.667,0S384,19.14,384,42.667c0,10.53,3.925,20.591,10.812,28.322l-38.178,38.178 c-3.336,3.337-3.336,8.73,0,12.066C359.97,124.57,365.363,124.57,368.7,121.233z"></path>{" "}
                    <path d="M42.667,128c10.53,0,20.591-3.925,28.322-10.812l38.178,38.178c1.664,1.664,3.849,2.5,6.033,2.5s4.369-0.836,6.033-2.5 c3.336-3.337,3.336-8.73,0-12.066L76.689,98.756c-1.784-1.784-4.301-2.671-6.784-2.466c-2.517,0.23-4.804,1.553-6.255,3.627 c-4.796,6.903-12.638,11.017-20.983,11.017c-14.114,0-25.6-11.486-25.6-25.6s11.486-25.6,25.6-25.6 c2.338,0,4.796,0.427,7.706,1.357c3.029,0.956,6.349,0.154,8.61-2.108c2.253-2.253,3.063-5.572,2.108-8.61 c-0.93-2.91-1.357-5.367-1.357-7.706c0-14.114,11.486-25.6,25.6-25.6s25.6,11.486,25.6,25.6c0,8.346-4.113,16.188-11.017,20.983 c-2.074,1.451-3.405,3.738-3.627,6.255s0.683,5,2.466,6.784l44.544,44.544c3.336,3.336,8.73,3.336,12.066,0 c3.337-3.337,3.337-8.73,0-12.066l-38.178-38.178C124.075,63.258,128,53.197,128,42.667C128,19.14,108.86,0,85.333,0 C61.807,0,42.667,19.14,42.667,42.667C19.14,42.667,0,61.807,0,85.333C0,108.86,19.14,128,42.667,128z"></path>{" "}
                    <path d="M307.2,290.133c18.825,0,34.133-15.309,34.133-34.133c0-18.825-15.309-34.133-34.133-34.133S273.067,237.175,273.067,256 C273.067,274.825,288.375,290.133,307.2,290.133z M307.2,238.933c9.412,0,17.067,7.654,17.067,17.067 c0,9.412-7.654,17.067-17.067,17.067s-17.067-7.654-17.067-17.067C290.133,246.588,297.788,238.933,307.2,238.933z"></path>{" "}
                    <path d="M375.467,358.4c4.173,0,7.731-3.021,8.414-7.125l8.107-48.597C403.831,289.92,409.6,274.62,409.6,256 c0-84.693-68.907-153.6-153.6-153.6S102.4,171.307,102.4,256c0,18.347,5.922,34.031,17.621,46.677l8.098,48.597 c0.683,4.104,4.241,7.125,8.414,7.125h34.133c6.886,0,8.311,7.27,8.653,9.941l8.533,51.2c0.683,4.113,4.241,7.125,8.414,7.125 h51.2c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-8.533V384c0-4.71-3.823-8.533-8.533-8.533 s-8.533,3.823-8.533,8.533v25.6h-18.372l-7.27-43.546c-0.887-8.55-7.381-24.721-25.557-24.721h-26.906l-7.347-44.075 c-0.29-1.749-1.118-3.371-2.381-4.634c-9.805-9.788-14.566-21.768-14.566-36.625c0-75.281,61.252-136.533,136.533-136.533 S392.533,180.719,392.533,256c0,19.78-8.311,30.387-14.566,36.625c-1.254,1.263-2.091,2.884-2.381,4.634l-7.347,44.075h-26.906 c-17.169,0-24.183,15.88-25.481,24.192l-7.347,44.075h-18.372V384c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533 v34.133c0,4.71,3.823,8.533,8.533,8.533h34.133c4.173,0,7.731-3.012,8.414-7.125l8.542-51.226 c0.171-1.015,1.903-9.916,8.644-9.916H375.467z"></path>{" "}
                    <path d="M238.933,341.333h34.133c0.06-0.009,0.111,0,0.171,0c4.71,0,8.533-3.823,8.533-8.533c0-0.657-0.077-1.297-0.213-1.911 c-0.546-12.143-6.357-32.222-25.557-32.222c-20.25,0-25.6,22.332-25.6,34.133C230.4,337.51,234.223,341.333,238.933,341.333z M256,315.733c4.045,0,6.178,4.267,7.296,8.533h-14.592C249.822,320,251.955,315.733,256,315.733z"></path>{" "}
                    <path d="M204.8,221.867c-18.825,0-34.133,15.309-34.133,34.133c0,18.825,15.309,34.133,34.133,34.133 s34.133-15.309,34.133-34.133C238.933,237.175,223.625,221.867,204.8,221.867z M204.8,273.067 c-9.412,0-17.067-7.654-17.067-17.067c0-9.412,7.654-17.067,17.067-17.067c9.412,0,17.067,7.654,17.067,17.067 C221.867,265.412,214.212,273.067,204.8,273.067z"></path>{" "}
                    <path d="M469.333,384c-10.53,0-20.591,3.925-28.322,10.812L407.1,360.9c-3.336-3.336-8.73-3.336-12.066,0 c-3.337,3.337-3.337,8.73,0,12.066l40.277,40.277c1.783,1.784,4.275,2.662,6.784,2.466c2.517-0.222,4.804-1.553,6.255-3.627 c4.796-6.904,12.638-11.017,20.983-11.017c14.114,0,25.6,11.486,25.6,25.6s-11.486,25.6-25.6,25.6 c-2.338,0-4.796-0.427-7.706-1.357c-3.038-0.956-6.357-0.145-8.61,2.108s-3.063,5.572-2.108,8.61 c0.93,2.918,1.357,5.367,1.357,7.706c0,14.114-11.486,25.6-25.6,25.6s-25.6-11.486-25.6-25.6c0-8.346,4.113-16.188,11.017-20.983 c2.074-1.451,3.396-3.738,3.627-6.255c0.222-2.517-0.683-5.001-2.466-6.784L355.9,377.967c-3.337-3.336-8.73-3.336-12.066,0 c-3.337,3.337-3.337,8.73,0,12.066l50.978,50.978C387.925,448.742,384,458.803,384,469.333C384,492.86,403.14,512,426.667,512 s42.667-19.14,42.667-42.667c23.526,0,42.667-19.14,42.667-42.667S492.86,384,469.333,384z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>{" "}
          <p className="text-lg mt-4">
            The word to find was: {word.toUpperCase()}
          </p>
        </>
      )}
      <PlayAgain inMenu onClick={handleClick} />
    </>
  );
};
