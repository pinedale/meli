import { useState } from "react";
import TableCategory from "./components/table-category/table-category";
import ChecklistFields from "./components/checklist-fields";

const ChecklistDetails: React.FC = () => {
  const [addCategory, setAddCaategory] = useState(false)

  const toggleCategory = () =>{
    setAddCaategory(!addCategory)
  }

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <ChecklistFields />
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Categories</h2>
          <button className="bg-white text-red-400 hover:border-red-400" onClick={toggleCategory}>+ Add Category</button>
        </div>
        <TableCategory addCategory={addCategory} toggleCategory={toggleCategory}/>
      </div>
    </div>
  )
}

export default ChecklistDetails;