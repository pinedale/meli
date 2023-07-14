import { useNavigate } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { useState } from "react";
import TableChapter from "./components/table-chapters";
import MandatoriesFields from "./components/mandatories-fields";

const MandatoryDetails: React.FC = () => {
  const {organization} = useFetch();
  const [addChapter, setAddChapter] = useState(false)
  const navigate = useNavigate();

  const handleClose = () =>{
    navigate(`/organization/${organization}/mandatories`);
  }

  const toggleChapter = () =>{
    setAddChapter(!addChapter)
  }

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className="text-base text-gray-700">Edit Course</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <MandatoriesFields />
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Chapters</h2>
          <button className="bg-white text-red-400 hover:border-red-400" onClick={toggleChapter}>+ Add Chapter</button>
        </div>
        <TableChapter addChapter={addChapter} toggleChapter={toggleChapter}/>
      </div>
    </div>
  )
}

export default MandatoryDetails;