import { ReactNode, createContext, useState } from "react";

type Modal = "rules" | "menu";

type ModalContextType = {
  modalType: Modal;
  handleTypeChange: (type: Modal) => void;
  handleOpenModal: (delay: number, action?: () => void) => void;
  handleCloseModal: () => void;
  isOpen: boolean;
};

const initialState: ModalContextType = {
  modalType: "rules",
  handleTypeChange: () => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  isOpen: false,
};

export const ModalContext = createContext<ModalContextType>(initialState);

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<Modal>("rules");
  const [isOpen, setIsOpen] = useState(false);
  const handleTypeChange = (type: Modal) => {
    setModalType(type);
  };
  const handleOpenModal = (delay: number, action?: () => void) => {
    const modal = document.getElementById("modal");

    if (modal instanceof HTMLDialogElement) {
      const timer = setTimeout(() => {
        modal.show();
        action && action();
      }, delay);
      return () => clearTimeout(timer);
    }
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("modal");

    if (modal instanceof HTMLDialogElement) {
      modal.close();
      setIsOpen(false);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        modalType,
        isOpen,
        handleTypeChange,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
