import { useState } from "react";
import Summary from "../../components/Summary";

import Modal from "../../components/Modal";
import ChecklistFields from "./components/checklist-fields";
import Table from "./components/table";

const Checklist = () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
    

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (itemId: number) =>{
    setSelectedItemId(itemId);
    openModal();
  }

  const handleCreateNewChecklist = () => {
    setSelectedItemId(null);
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
        <Table onOpenModal={handleOpenModal}/>
      </div>
      
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <ChecklistFields onClose={closeModal} id={selectedItemId}/>
      </Modal>
    </>
  )
};

export default Checklist