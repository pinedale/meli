import { useParams } from "react-router-dom";
import { useGetMandatoryChapterDetails } from "./services";
import { useState } from "react";
import TableQuestions from "./components/table-questions";
import ChapterFields from "./components/chapter-fields";


const MandatoryChapters: React.FC = () => {
  const { mandatoryId, chapterId } = useParams();
  const { data } = useGetMandatoryChapterDetails(mandatoryId, chapterId);

  const [addQuestion, setAddQuestion] = useState(false)

  const toggleQuestion = () => {
    setAddQuestion(!addQuestion)
  }

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <ChapterFields data={data}/>
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Questions ({data?.questions?.length})</h2>
          <button className="bg-white text-red-400 hover:border-red-400" onClick={toggleQuestion}>+ Add Question</button>
        </div>
        <TableQuestions addChapter={addQuestion} toggleChapter={toggleQuestion} />
      </div>
    </div>
  )
}

export default MandatoryChapters;