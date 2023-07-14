import { useState } from "react";
import Summary from "../../components/Summary";

import Modal from "../../components/Modal";
import ChecklistFields from "./components/checklist-fields";
import Table from "./components/table";
import { useNavigate } from "react-router-dom";

const Checklist = () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };
    

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/checklist");
  };

  const handleCreateNewChecklist = () => {
    openModal();
  };

  return(
    <>
      <Summary />
      <div className="py-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button className="bg-white text-red-400 hover:border-red-400" onClick={handleCreateNewChecklist}> + Create New Checklist</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <Table />
      </div>
      
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <ChecklistFields onClose={closeModal} />
      </Modal>
    </>
  )
};

export default Checklist