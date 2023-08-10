import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useRef, useState } from "react";
import Table from "../../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "flowbite-react";
import { useCreateMandatoryQuestion } from "./services";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const schema = yup.object({
  title: yup.string().required("Required field"),
  correct_answer_index: yup.string(),
})

type Question = {
  rank: string;
  title: string;
  correct_answer_index: string;
  is_randomized: boolean;
  answers: string[];
}

type Answer = {
  title: string;
}

const MandatoryQuestionNew = () => {
  const { organization } = useFetch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mandatoryId, chapterId } = useParams();
  const [addItem, setAddItem] = useState<boolean>(false);
  const [answerList, setAnswerList] = useState<Answer[]>([]);

  const handleClose = () => {
    navigate(`/organization/${organization}/mandatories/${mandatoryId}/chapters/${chapterId}`);
  }

  const toggleAddItem = () => {
    setAddItem(!addItem)
  }

  const columns = useMemo<ColumnDef<Answer>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 80,
      },
    ]
    , []);

  const { register, handleSubmit, reset } = useForm<Question>({
    defaultValues: {
      answers: [],
      title: "",
      rank: "",
      correct_answer_index: "",
      is_randomized: false,
    },
    resolver: yupResolver(schema) as any,
  });

  const { mutate: createMandatoryQuestion } = useCreateMandatoryQuestion({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The question has been created successfully");
      navigate(`/organization/${organization}/mandatories/${mandatoryId}/chapters/${chapterId}`);
      queryClient.invalidateQueries(['courses-chapter-details']);
    }
  })

  const inputRef = useRef<HTMLInputElement | null>(null);

  const collectAnswers = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      setAnswerList([...answerList, { title: inputRef.current.value }]);
      inputRef.current.value = "";
    }
  }

  const onSubmit = handleSubmit((values) => {
    const answersData = answerList.map(obj => obj.title);
    const payload = {
      courseId: mandatoryId || "",
      chapterId: chapterId || "",
      data: {
        ...values,
        answers: answersData
      },
    };

    if (answersData.length >= 2) {
      createMandatoryQuestion(payload)
    } else {
      toast.error("You need to add more than one answer option")
    }
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
              <button onClick={handleClose} type="button" className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
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
              {
                answerList.length > 1 && (
                  <div>
                    <label className="text-gray-700 text-xs mb-1 block">Select Correct Answer</label>
                    <select
                      className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                      {...register("correct_answer_index", { required: 'Title is required' })}
                    >
                      {answerList?.map((item, index) => (
                        <option key={item.title} value={index}>Answer {index + 1}</option>
                      ))}

                    </select>
                  </div>
                )
              }
            </div>
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl text-gray-700">Answer Options</h2>
              <div className="flex gap-2">
                <label className="cursor-pointer flex items-center gap-2" htmlFor={"random"}>
                  <span className="text-xs">Randomize Answers</span>
                  <Checkbox id="random"  {...register('is_randomized')} />
                </label>
                <button onClick={toggleAddItem} type="button" className="bg-white text-red-400 hover:border-red-400">+ Add Option</button>
              </div>
              
            </div>
            {
              answerList.length === 0
              ? <p className=" text-sm">No options have been added.</p>
              : <Table data={answerList || []} columns={columns} isLoading={false} />
            }
            
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

export default MandatoryQuestionNew;