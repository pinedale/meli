import { useNavigate, useParams } from "react-router-dom";
import TableSection from "./components/table-section";
import { useFetch } from "../../contexts/fetchProvider";

const ChecklistSection: React.FC = () => {
  const navigate = useNavigate();
  const {organization} = useFetch()
  const { checklistId } = useParams()

  const handleClose = () =>{
    navigate(`/organization/${organization}/checklist/${checklistId}`);
  }

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className="text-base text-gray-700">Care Settings</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <h2 className=" text-2xl text-gray-700 mb-8">User Detasssils</h2>
        <TableSection />
      </div>
    </div>
  )
}

export default ChecklistSection;