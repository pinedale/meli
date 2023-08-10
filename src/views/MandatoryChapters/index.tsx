import { useNavigate, useParams } from "react-router-dom";
import { DeleteMandatoryQuestionParams, Question, useDeleteMandatoryQuestion, useGetMandatoryChapterDetails } from "./services";
import { useMemo, useState } from "react";
import ChapterFields from "./components/chapter-fields";
import Table from "../../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useFetch } from "../../contexts/fetchProvider";
import ModalConfirmation from "../../components/ModalConfirmation";


const MandatoryChapters: React.FC = () => {
  const { organization } = useFetch();
  const { mandatoryId, chapterId } = useParams();
  const { data, isLoading } = useGetMandatoryChapterDetails(mandatoryId, chapterId);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DeleteMandatoryQuestionParams>();
  const { mutateAsync: deleteTestQuestion } = useDeleteMandatoryQuestion()

  const handleDelete = (item: DeleteMandatoryQuestionParams) => {
    setSelectedItem(item)
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const confirmDelete = () => {
    if (selectedItem) {
      deleteTestQuestion(selectedItem);
      setIsModalOpen(false);
    }
  }

  const columns = useMemo<ColumnDef<Question>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'questions',
        header: 'Answer Options',
        size: 120,
        cell: (info) =>
          <div>
            {info.row.original.answers ? info.row.original.answers.length : 0}
          </div>
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 80,
        cell: (info) =>
          <div className='flex text-base gap-2'>
            <Tooltip content="View details">
              <button
                onClick={() => navigate(`/organization/${organization}/mandatories/${mandatoryId}/chapters/${chapterId}/question/${info.row.original.id}`)}
                data-tooltip-target="tooltip-dark"
                type="button" className='px-1'
              >
                <HiEye />
              </button>
            </Tooltip>
            <Tooltip content="Delete">
              <button
                type="button"
                className='px-1'
                onClick={() => handleDelete({ course_id: mandatoryId || "", chapter_id: chapterId || "", question_id: info.row.original.id || "" })}
              >
                <FaTrash />
              </button>
            </Tooltip>
          </div>
      },
    ]
    , [chapterId, mandatoryId, navigate, organization]);

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <ModalConfirmation confirmDelete={confirmDelete} onClose={closeModal} isOpen={isModalOpen} />
      <ChapterFields data={data} />
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Questions ({data?.questions?.length})</h2>
          <button
            className="bg-white text-red-400 hover:border-red-400"
            onClick={() => navigate(`/organization/${organization}/mandatories/${mandatoryId}/chapters/${chapterId}/question/new`)}
          >
            + Add Question
          </button>
        </div>
        <Table data={data?.questions || []} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default MandatoryChapters;