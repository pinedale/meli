import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

const schema = yup.object({
  title: yup.string().required("Required field"),
  answers: yup.array().min(2).of(yup.string()).required(),
  rank: yup.string().required("Required field"),
})

type Question = {
  rank: string;
  title: string;
  answers: string[];
}

const TestQuestionNew = () => {
  const { organization } = useFetch();
  const navigate = useNavigate();
  const { testId, categoryId } = useParams()
  const [addItem, setAddItem] = useState<boolean>(false);
  const [answerList, setAnswerList] = useState<string[]>([]);
  console.log("🚀 ~ file: index.tsx:26 ~ TestQuestionNew ~ answers:", answerList)

  const handleClose = () => {
    navigate(`/organization/${organization}/test/${testId}/category/${categoryId}`);
  }

  const toggleAddItem = () => {
    setAddItem(!addItem)
  }

  const { register, handleSubmit, reset } = useForm<Question>({
    defaultValues: {
      answers: [],
      title: "",
      rank: "2",
    },
    resolver: yupResolver(schema) as any,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const collectAnswers = () => {
    debugger;
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      setAnswerList([...answerList, inputRef.current.value]);
      inputRef.current.value = ""; // Clear the input field after saving the answer
    }
  }

  const onSubmit = handleSubmit((values) => {
    console.log("🚀 ~ file: index.tsx:56 ~ onSubmit ~ values:", values)
    debugger;
    // const payload = {
    //   id: mandatoryId,
    //   data: values,
    // };

  });

  useEffect(() => {
    reset()
  }, [reset]);

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className="overflow-y-auto h-full pb-10">
        <form onSubmit={onSubmit}>
          <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
            <div>
              <button onClick={() => handleClose} type="button" className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
            </div>
            <div><h1 className="text-base text-gray-700">Question Create</h1></div>
            <div>
              <button
                type="submit"
                className="bg-red-400 hover:border-red-600 text-white w-20 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
          <div className="max-w-6xl mx-auto pt-14">
            <div className="flex justify-between mb-8">
              <h2 className=" text-2xl text-gray-700">Question Details</h2>
            </div>
            <div className="w-full grid gap-4 mb-10">
              <div className="col-span-3">
                <label className="text-gray-700 text-xs mb-1 block">Title</label>
                <textarea
                  className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                  placeholder="Enter question title"
                  {...register('title', { required: 'Title is required' })}
                />
              </div>
            </div>
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl text-gray-700">Answer Options</h2>
              <button onClick={toggleAddItem} type="button" className="bg-white text-red-400 hover:border-red-400">+ Add Option</button>
            </div>
            {
              addItem && (
                <div className="border-2 p-1 rounded-lg mt-1">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter Title"
                      className="w-full px-2 py-2 border-gray-200 text-xs rounded"
                      ref={inputRef}
                    />
                    <div className="flex gap-2 px-1">
                      <button type="button" onClick={toggleAddItem} className="bg-white text-red-400 hover:border-red-400">Cancel</button>
                      <button onClick={collectAnswers} type="button" className="bg-white text-red-400 hover:border-red-400">Save</button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default TestQuestionNew;