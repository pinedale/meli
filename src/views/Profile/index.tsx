
import { useState } from "react";
import Modal from "../../components/Modal";
import MandatoriesFields from "../Mandatories/components/mandatories-fields";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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