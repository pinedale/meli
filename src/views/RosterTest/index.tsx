import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { AiFillPrinter } from "react-icons/ai";
import { Category, Question, useGetOrganization, useGetTestResult } from "./services";
import { format } from "date-fns";
import { BeatLoader } from "react-spinners";

const RosterTest = () => {
  const { organization } = useFetch();
  const { rosterId, testId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetTestResult(rosterId, testId)
  const { data: organizationData } = useGetOrganization();
  
  const incorrectQuestions: Question[] | undefined = data?.categories.reduce((acc: Question[], item: Category) => {
    const incorrectQuestionsInCategory = item.questions.filter((question: Question) => !question.is_correct);
    return acc.concat(incorrectQuestionsInCategory);
  }, []);
  console.log("🚀 ~ file: index.tsx:18 ~ constincorrectQuestions:Question[]|undefined=data?.categories.reduce ~ incorrectQuestions:", incorrectQuestions)

  const resultQuestions = data?.categories?.map(category =>{
    const totalQuestions = category.questions.length;
    const questionsCorrect = category.questions.filter(question => question.is_correct).length;
    const percentage = (questionsCorrect/totalQuestions)*100;

    return {
      id: category.id,
      title: category.title,
      rank: category.rank,
      questionsCorrect,
      totalQuestions,
      percentage,
  };
  })

  if (isLoading) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

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
        <div className="max-w-6xl mx-auto pt-14 print:pt-0 mb-10">
          <div className="mb-10">
            <div className=" w-32">
              <img className="w-full object-cover" src={organizationData?.logo_url} alt={organizationData?.title} />
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-gray-200 pt-8 mb-12">
            <div>
              <h3 className="font-bold mb-2">PROFESSIONAL</h3>
              <div>
                <span className="font-bold text-2xl print:text-xl">{data?.user_full_name}</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">TEST</h3>
              <div>
                <h4 className="font-bold text-2xl print:text-xl mb-1">{data?.title}</h4>
                <ul>
                  <li className="font-medium">Started - {data?.started_at ? format(new Date(data?.started_at), 'PPpp') : ''}</li>
                  <li className="font-medium">Completed - {data?.ended_at ? format(new Date(data?.ended_at), 'PPpp') : ''}</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">OVERALL SCORE</h3>
              <div>
                <h4 className="font-bold text-2xl print:text-xl mb-1">{data?.score}%</h4>
                <p>{data?.passed ? <b className="text-green-500">Pass</b> : <b className=" text-red-600">Did Not Pass</b>}</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded mb-10">
            {resultQuestions && resultQuestions.map((item)=>(
              <div key={item.id} className="flex justify-between p-5 border-b last:border-0">
                <b>{item.title}</b>
                <div>{item.questionsCorrect} of {item.totalQuestions} Correct - {item.percentage.toFixed(0)}%</div>
              </div>
            ))}
          </div>
          {
           incorrectQuestions && incorrectQuestions?.length > 0 &&
           <h3 className="font-bold mb-5">INCORRECTLY ANSWERED QUESTIONS ({incorrectQuestions?.length})</h3>
          }
          <div className="flex gap-4 flex-col">
            {incorrectQuestions?.map((item, index) => (
              <div key={item.id} className="border border-gray-300 rounded py-4 px-5">
                <h4 className="font-bold mb-3">Q{item.rank}</h4>
                <p className="mb-3 text-base text-black font-medium">{item.title}</p>
                <p className=" text-red-600">{item.answer_value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RosterTest;