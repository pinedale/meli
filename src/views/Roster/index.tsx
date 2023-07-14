import { useState } from "react";
import Summary from "../../components/Summary";
import Modal from "../../components/Modal";
import RostertFields from "./components/roster-fields";
import Table from "./components/table";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";


const Roster = () =>{
  const {organization} = useFetch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean | undefined>(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    navigate(`/organization/${organization}/roster`);
  };

  const handleOpenModal = (itemId: string) =>{
    setIsEditing(true);
    setSelectedItemId(itemId);
    openModal();
  }

  return(
    <>
      <Summary />
      <div className="py-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button className="bg-white text-red-400 hover:border-red-400" onClick={openModal}> + Create New Member</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <Table onOpenModal={handleOpenModal}/>
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <RostertFields onClose={closeModal} id={selectedItemId} isEditing={isEditing}/>
      </Modal>
    </>
  )
};

export default Roster