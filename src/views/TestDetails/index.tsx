import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import TestFields from "./components/test-fields";
import Table from "../../components/Table";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { type CategoryAttr, CategoryItem, useGetTestCategories, useAddTestCategory, useDeleteTestCategory } from "./services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useFetch } from "../../contexts/fetchProvider";
import ModalConfirmation from "../../components/ModalConfirmation";

const schema = yup.object({
  title: yup.string().required("Required field"),
})

const TestDetails: React.FC = () => {
  const navigate = useNavigate();
  const { organization } = useFetch();
  const { testId } = useParams()
  const queryClient = useQueryClient();
  const { data, isFetching } = useGetTestCategories(testId);
  const [addItem, setAddItem] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ test_id: string | undefined; category_id: string; }>();

  const { mutateAsync: deleteTest } = useDeleteTestCategory()

  const handleDelete = (item: {test_id: string | undefined; category_id: string;}) =>{
    setSelectedItem(item)
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const confirmDelete = () => {
    if(selectedItem){
      deleteTest(selectedItem);
      setIsModalOpen(false);
    }
  }

  const toggleAddItem = () => {
    setAddItem(!addItem)
  }

  const colums = useMemo<ColumnDef<CategoryItem>[]>(() =>
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
            {info.row.original.questions.length}
          </div>
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 80,
        cell: (info) =>
				<div className='flex text-base gap-2'>
					<Tooltip content="View category details">
						<button
							onClick={() => navigate(`/organization/${organization}/test/${testId}/category/${info.row.original.id}`)}
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
              onClick={() => handleDelete({test_id:testId, category_id:info.row.original.id})}
						>
							<FaTrash />
						</button>
					</Tooltip>
				</div>
      },
    ]
    , [navigate, organization, testId]);

    const { mutate } = useAddTestCategory(testId ?? '', {
      onError: (error) => {
        toast.error(error.response?.data?.error?.message)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['test-categories'])
        toast.success('Successfully added!');
        reset();
        setAddItem(!addItem);
      }
    })

  const { register, handleSubmit, reset } = useForm<CategoryAttr>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values) => {
    mutate(values)
  });

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className="overflow-y-auto h-full pb-10">
        <ModalConfirmation confirmDelete={confirmDelete} onClose={closeModal} isOpen={isModalOpen}/>
        <TestFields />
        <div className="max-w-6xl mx-auto pt-14">
          <div className="flex justify-between mb-8">
            <h2 className="text-2xl text-gray-700">Categories</h2>
            <button type="button" onClick={toggleAddItem} className="bg-white text-red-400 hover:border-red-400" >+ Add Category</button>
          </div>
          <Table data={data || []} isLoading={isFetching} columns={colums} />
          {
            addItem && (
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
                      <button type="button" onClick={toggleAddItem} className="bg-white text-red-400 hover:border-red-400">Cancel</button>
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

export default TestDetails;