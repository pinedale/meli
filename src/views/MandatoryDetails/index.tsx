import { useState } from "react";
import TableChapter from "./components/table-chapters";
import MandatoriesFields from "./components/mandatories-fields";

const MandatoryDetails: React.FC = () => {
  const [addChapter, setAddChapter] = useState(false)

  const toggleChapter = () => {
    setAddChapter(!addChapter)
  }

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className="overflow-y-auto h-full pb-10">
        <MandatoriesFields />
        <div className="max-w-6xl mx-auto pt-14">
          <div className="flex justify-between mb-8">
            <h2 className="text-2xl text-gray-700">Chapters</h2>
            <button type="button" className="bg-white text-red-400 hover:border-red-400" onClick={toggleChapter}>+ Add Chapter</button>
          </div>
          <TableChapter addChapter={addChapter} toggleChapter={toggleChapter} />
        </div>
      </div>
    </div>
  )
}

export default MandatoryDetails;