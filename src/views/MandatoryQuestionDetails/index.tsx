import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox, Tooltip } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Table from "../../components/Table";
import { BeatLoader } from "react-spinners";
import { useGetMandatoryQuestionDetails, useUpdateMandatoryQuestion } from "./services";

const schema = yup.object({
  title: yup.string().required("Required field"),
  correct_answer_index: yup.string(),
})

type Question = {
  rank: string;
  title: string;
  correct_answer_index: string;
  is_randomized: boolean | string;
  answers: string[];
}

type Answer = {
  title: string;
  isCorrect: boolean;
}

const MandatoryQuestionDetails = () => {
  const { organization } = useFetch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mandatoryId, chapterId, questionId } = useParams();
  const [addItem, setAddItem] = useState<boolean>(false);

  const { data, isLoading } = useGetMandatoryQuestionDetails(mandatoryId ?? "", chapterId ?? "", questionId ?? "");

  const transformedArray = data?.answers && data?.answers.map(answer => {
    return { "title": answer, isCorrect: false };
  });

  const [answerList, setAnswerList] = useState<Answer[]>(transformedArray || []);


  const handleClose = () => {
    navigate(`/organization/${organization}/test/${mandatoryId}/category/${chapterId}`);
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
        accessorKey: 'isCorrect',
        header: 'Correct question',
        size: 50,
        cell: (info) =>
          <div className=" text-2xl text-red-app">{info.row.original.isCorrect && <HiCheckCircle />}</div>
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 80,
        cell: (info) =>
          <div className='flex text-base gap-2'>
            <Tooltip content="Delete">
              <button
                type="button"
                className='px-1'
                onClick={() => handleDeleteItem(info.row.index)}
              >
                <FaTrash />
              </button>
            </Tooltip>
          </div>
      },
    ]
    , []);

  const { register, handleSubmit, reset, watch } = useForm<Question>({
    defaultValues: {
      answers: data?.answers,
      title: data?.title,
      rank: data?.rank,
      correct_answer_index: data?.correct_answer_index,
      is_randomized: data?.is_randomized ? "true" : "false",
    },
    resolver: yupResolver(schema) as any,
  });

  const selectValue = watch("correct_answer_index");

  const { mutate: updateTestQuestion } = useUpdateMandatoryQuestion({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The question has been updated successfully");
      navigate(`/organization/${organization}/test/${mandatoryId}/category/${chapterId}`);
      queryClient.invalidateQueries(['test-category-details']);
    }
  })

  const inputRef = useRef<HTMLInputElement | null>(null);

  const collectAnswers = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      setAnswerList([...answerList, { title: inputRef.current.value, isCorrect: false }]);
      inputRef.current.value = "";
    }
  }

  const handleDeleteItem = (index: number) => {
    setAnswerList(prevList => prevList.filter((_, i) => i !== index));
  };

  const onSubmit = handleSubmit((values) => {
    const answersData = answerList.map(obj => obj.title);
    const payload = {
      courseId: mandatoryId || "",
      chapterId: chapterId || "",
      questionId: questionId || "",
      data: {
        ...values,
        answers: answersData,
        is_randomized: !!values.is_randomized
      },
    };

    if (answersData.length >= 2) {
      updateTestQuestion(payload)
    } else {
      toast.error("You need to add more than one answer option")
    }
  });

  useEffect(() => {
    reset(data)
  }, [data, reset]);

  useEffect(() => {
    if (data?.answers) {
      const correctAnswerIndex = parseInt(selectValue, 10);
      const transformedArray = data?.answers.map((answer, index) => {
        return {
          "title": answer,
          "isCorrect": index === correctAnswerIndex
        };
      });
      setAnswerList(transformedArray)
    }
  }, [data?.answers, data?.correct_answer_index, selectValue]);

  if (isLoading) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

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
              <h2 className="text-2xl text-gray-700">Answer Options ({answerList.length})</h2>
              <div className="flex gap-2">
                <label className="cursor-pointer flex items-center gap-2" htmlFor={"random"}>
                  <span className="text-xs">Randomize Answers</span>
                  <Checkbox value="true" id="random"  {...register('is_randomized')} />
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

export default MandatoryQuestionDetails;