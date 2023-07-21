import { useParams } from "react-router-dom";
import QuestionFields from "./components/question-fields/question-fields";
import { useGetMandatoryQuestionDetails } from "./services";


const MandatoryQuestion: React.FC = () => {
  const { mandatoryId, chapterId, questionId } = useParams();
  const {data} = useGetMandatoryQuestionDetails(mandatoryId, chapterId, questionId)

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <QuestionFields data={data}/>
    </div>
  )
}

export default MandatoryQuestion;