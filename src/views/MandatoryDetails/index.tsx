import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMemo, useState } from "react";
import MandatoriesFields from "./components/mandatories-fields";
import Table from "../../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ChapterAdd, ChapterAttr, DeleteTestChapterParams, useAddMandatoryChapter, useDeleteMandatoryChapter, useGetMandatoryChapters } from "./services";
import { useFetch } from "../../contexts/fetchProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import ModalConfirmation from "../../components/ModalConfirmation";

const schema = yup.object({
  title: yup.string().required("Required field"),
})

const MandatoryDetails: React.FC = () => {
  const { organization } = useFetch();
  const [addChapter, setAddChapter] = useState(false);
  const queryClient = useQueryClient();
  const { mandatoryId } = useParams()
  const { data, isLoading } = useGetMandatoryChapters(mandatoryId);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DeleteTestChapterParams>();

  const { mutateAsync: deleteChapter } = useDeleteMandatoryChapter()

  const handleDelete = (item: DeleteTestChapterParams) => {
    setSelectedItem(item)
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const confirmDelete = () => {
    if (selectedItem) {
      deleteChapter(selectedItem);
      setIsModalOpen(false);
    }
  }

  const toggleChapter = () => {
    setAddChapter(!addChapter)
  }

  const { mutate } = useAddMandatoryChapter(mandatoryId ?? '', {
    onError: (error) => {
      toast.error(error.response?.data?.error?.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mandatory-chapters'])
      toast.success('Successfully added!');
      reset();
      setAddChapter(!addChapter);
    }
  })

  const { register, handleSubmit, reset } = useForm<ChapterAdd>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values) => {
    mutate(values);
  });

  const colums = useMemo<ColumnDef<ChapterAttr>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'questions',
        header: 'Questions',
        size: 120,
        cell: (info) =>
          <div>
            {info.row.original.questions ? info.row.original.questions.length : 0}
          </div>
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 80,
        cell: (info) =>
          <div className='flex text-base gap-2'>
            <Tooltip content="View chapter details">
              <button
                onClick={() => navigate(`/organization/${organization}/mandatories/${mandatoryId}/chapters/${info.row.original.id}`)}
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
                onClick={() => handleDelete({ course_id: mandatoryId || "", chapter_id: info.row.original.id })}
              >
                <FaTrash />
              </button>
            </Tooltip>
          </div>
      },
    ]
    , [mandatoryId, navigate, organization]);

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className="overflow-y-auto h-full pb-10">
        <ModalConfirmation confirmDelete={confirmDelete} onClose={closeModal} isOpen={isModalOpen} />
        <MandatoriesFields />
        <div className="max-w-6xl mx-auto pt-14">
          <div className="flex justify-between mb-8">
            <h2 className="text-2xl text-gray-700">Chapters</h2>
            <button type="button" className="bg-white text-red-400 hover:border-red-400" onClick={toggleChapter}>+ Add Chapter</button>
          </div>
          <Table data={data || []} isLoading={isLoading} columns={colums} />
          {
            addChapter && (
              <div className="border-2 p-1 rounded-lg mt-1">
                <form onSubmit={onSubmit}>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter Title"
                      className="w-full px-2 py-2 border-gray-200 text-xs rounded"
                      {...register('title', { required: 'Required field' })}
                    />
                    <div className="flex gap-2 px-1">
                      <button type="button" onClick={toggleChapter} className="bg-white text-red-400 hover:border-red-400">Cancel</button>
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

export default MandatoryDetails;