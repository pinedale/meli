import { useNavigate } from "react-router-dom";
import Table from "./components/table";

const Bundles = () => {
  const navigate = useNavigate();

  return(
    <>
      <div className="py-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button className="bg-white text-red-400 hover:border-red-400" onClick={() => navigate("/organization/${organization}/bundles/new")}> + Create New Bundle</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <Table />
      </div>
    </>
  )
};

export default Bundles