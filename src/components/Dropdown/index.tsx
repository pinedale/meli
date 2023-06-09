import { useState } from "react"
import { AiFillCaretDown } from "react-icons/Ai";
import Modal from "../Modal";
import ProfileFields from "../../views/Profile/ProfileFields";

const Dropdown = () =>{
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleDropdown = () =>{
    setIsOpen(!isOpen);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return(
    <div className="relative">
      <div onClick={toggleDropdown} className="text-gray-700 flex items-center cursor-pointer gap-1">
        <div className="text-xs text-right">
          <p>Leandro Pineda</p>
          <p className="text-red-app">Corporate</p>
        </div>
        <div className="text-sm">
          <AiFillCaretDown />
        </div>
      </div>
      {isOpen && (
        <nav className="rounded-md shadow-lg p-4 absolute z-10 text-xs bg-white border border-gray-100 right-0">
          <ul>
            <li>
              <a className="px-10 py-1 inline-block" onClick={openModal}>Profile</a>
            </li>
            <li>
              <a className="px-10 py-1 inline-block" href="">Logout</a>
            </li>
          </ul>
        </nav>
      )}
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <ProfileFields onClose={closeModal}/>
      </Modal>
    </div>
  )
}

export default Dropdown;