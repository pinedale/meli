type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}
const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      {children}
    </div>
  )
}

export default Modal;