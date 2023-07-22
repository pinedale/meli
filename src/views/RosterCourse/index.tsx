import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { AiFillPrinter } from "react-icons/ai";
import { useGetCourseResult } from "./services";
import { format } from "date-fns";

const RosterCourse = () => {
  const { organization } = useFetch();
  const { rosterId, courseId } = useParams()
  const navigate = useNavigate();

  const { data } = useGetCourseResult(rosterId, courseId)
  console.log("🚀 ~ file: index.tsx:12 ~ RosterCourse ~ data:", data)
  const incorrectQuestions = data && data.answers.filter((item) => !item.is_correct);

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className="print:hidden flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white w-20"
            type="button"
            onClick={() => navigate(`/organization/${organization}/roster/${rosterId}`)}
          >
            Back
          </button>
        </div>
        <div>
          <button type="button" onClick={() => window.print()} className="bg-red-400 hover:border-red-600 text-white text-lg"><AiFillPrinter /></button>
        </div>
      </div>
      <div className="overflow-y-auto h-full pb-10">
        <div className="max-w-6xl mx-auto pt-14">
          <div className="grid grid-cols-3 border-t border-gray-200 pt-8 mb-12">
            <div>
              <h3 className="font-bold mb-2">PROFESSIONAL</h3>
              <div>
                <span className="font-bold text-2xl">{data?.user_full_name}</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">TEST</h3>
              <div>
                <h4 className="font-bold text-2xl mb-1">{data?.title}</h4>
                <ul>
                  <li className="font-medium">Started - {data?.started_at ? format(new Date(data?.started_at), 'PPpp') : ''}</li>
                  <li className="font-medium">Completed - {data?.ended_at ? format(new Date(data?.ended_at), 'PPpp') : ''}</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">OVERALL SCORE</h3>
              <div>
                <h4 className="font-bold text-2xl mb-1">{data?.score}%</h4>
                <p>{data?.passed ? <span>Passs</span> : <b className=" text-red-600">Did Not Pass</b>}</p>
              </div>
            </div>
          </div>
          <h3 className="font-bold mb-5">INCORRECTLY ANSWERED QUESTIONS ({incorrectQuestions?.length})</h3>
          <div className="flex gap-4 flex-col">
            {incorrectQuestions && incorrectQuestions.map((item, index) => (
              <div key={item.value} className="border border-gray-300 rounded py-4 px-5">
                <h4 className="font-bold mb-3">Q{index+1}</h4>
                <p className="mb-3 text-base text-black font-medium">{item.question}</p>
                <p className=" text-red-600">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RosterCourse;