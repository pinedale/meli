import { Modal } from "flowbite"
import { useState } from "react";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return(
    <>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <MandatoriesFields onClose={closeModal}/>
      </Modal>
    </>
  )
}

export default Profile;