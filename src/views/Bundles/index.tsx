import { useState } from "react";
import Summary from "../../components/Summary";
import Modal from "../../components/Modal";
import BundlesFields from "./components/bundles-fields";
import Table from "./components/table";

const Bundles = () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return(
    <>
      <Summary />
      <div className="py-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button className="bg-white text-red-400 hover:border-red-400" onClick={openModal}> + Create New Bundle</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <Table />
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <BundlesFields onClose={closeModal}/>
      </Modal>
    </>
  )
};

export default Bundles