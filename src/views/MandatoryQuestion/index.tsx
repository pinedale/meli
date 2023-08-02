import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import QuestionFields from "./components/question-fields/question-fields";
import { useAddMandatoryQuestionOption, useGetMandatoryQuestionDetails } from "./services";
import Table from "../../components/Table";
import { Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useFetch } from "../../contexts/fetchProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

type Answer = {
  title: string;
}

const schema = yup.object({
  optionTitle: yup.string().required("Required field"),
})

const MandatoryQuestion: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { organization } = useFetch();
  const { mandatoryId, chapterId, questionId } = useParams();
  const [addItem, setAddItem] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { data, isLoading } = useGetMandatoryQuestionDetails(mandatoryId, chapterId, questionId);
  const [currentItemTitle, setCurrentItemTitle] = useState<string>("");

  const transformedArray = data?.answers?.map(answer => {
    return { "title": answer };
  });

  const toggleAddItem = () => {
    setAddItem(!addItem)
  }

  const handleEditButtonClick = (itemTitle: string) => {
    setCurrentItemTitle(itemTitle);
    setEditMode(true);
  }

  const colums = useMemo<ColumnDef<Answer>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Answer Option',
        size: 150,
      },
      {
        accessorKey: 'actions, title',
        header: 'Actions',
        size: 80,
        cell: (info) =>
          <div className='flex text-base gap-2'>
            <Tooltip content="View chapter details">
              <button
                data-tooltip-target="tooltip-dark"
                type="button" className='px-1'
              >
                <HiEye />
              </button>
            </Tooltip>
            <Tooltip content="Edit">
              <button
                type="button"
                className='px-1'
                onClick={() => handleEditButtonClick(info.row.original.title)}
              >
                <FaPencilAlt />
              </button>
            </Tooltip>
          </div>
      },
    ]
    , [navigate, organization]);

  const { register, handleSubmit } = useForm<{optionTitle: string}>({
    defaultValues: {
      optionTitle: "",
    },
    resolver: yupResolver(schema),
  });

  const { mutate } = useAddMandatoryQuestionOption({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The option has been updated successfully");
      navigate(`/organization/${organization}/mandatories/${mandatoryId}/chapters/${chapterId}/question/${questionId}`);
      queryClient.invalidateQueries(['mandatory-question-detail'])
    }
  })

  const onSubmit = handleSubmit((values) => {
    const payload = {
      id: mandatoryId,
      chapterId: chapterId,
      questionId: questionId,
      data: {
        rank: 2,
        is_randomized: true,
        answers:[
          ...data && data.answers ? data.answers : [],
          values.optionTitle
        ]
      }
    }
    mutate(payload);
  });

  useEffect(() => {
    // Restablecer el estado currentItemTitle cuando se desmonte el componente
    return () => setCurrentItemTitle("");
  }, []);


  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className="overflow-y-auto h-full pb-10">
        <QuestionFields data={data} />
        <div className="max-w-6xl mx-auto pt-14">
          <div className="flex justify-between mb-8">
            <h2 className="text-2xl text-gray-700">Answer Options</h2>
            <button type="button" onClick={toggleAddItem} className="bg-white text-red-400 hover:border-red-400">+ Add Option</button>
          </div>
          <Table data={transformedArray || []} columns={colums} isLoading={isLoading} />
          {
            addItem && (
              <div className="border-2 p-1 rounded-lg mt-1">
                <form onSubmit={onSubmit}>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter Title"
                      className="w-full px-2 py-2 border-gray-200 text-xs rounded"
                      {...register('optionTitle', { required: 'Required field' })}
                    />
                    <div className="flex gap-2 px-1">
                      <button type="button" onClick={toggleAddItem} className="bg-white text-red-400 hover:border-red-400">Cancel</button>
                      <button type="submit" className="bg-white text-red-400 hover:border-red-400">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            )
          }
          {
            editMode && (
              <div className="border-2 p-1 rounded-lg mt-1">
                <form onSubmit={onSubmit}>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter Title"
                      className="w-full px-2 py-2 border-gray-200 text-xs rounded"
                      value={currentItemTitle || ""}
                      onChange={(e) => setCurrentItemTitle(e.target.value)}
                    />
                    <div className="flex gap-2 px-1">
                      <button type="button" onClick={() => setEditMode(false)} className="bg-white text-red-400 hover:border-red-400">Cancel</button>
                      <button type="submit" className="bg-white text-red-400 hover:border-red-400">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MandatoryQuestion;