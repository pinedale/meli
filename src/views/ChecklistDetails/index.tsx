import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMemo, useState } from "react";
import ChecklistFields from "./components/checklist-fields";
import Table from "../../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryAdd, CategoryAttr, useAddChecklistCategory, useDeleteChecklistCategory, useGetChecklistCategories } from "./services";
import { Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useFetch } from "../../contexts/fetchProvider";
import { useNavigate, useParams } from "react-router-dom";
import ModalConfirmation from "../../components/ModalConfirmation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const schema = yup.object({
	title: yup.string().required("Required field"),
})

const ChecklistDetails: React.FC = () => {
  const { organization } = useFetch();
	const { checklistId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useGetChecklistCategories(checklistId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ checklistId: string; categoryId: string; }>();
  const [addItem, setAddItem] = useState<boolean>(false);

  const toggleAddItem = () => {
    setAddItem(!addItem)
  }

  const handleDelete = (item: {checklistId: string; categoryId: string;}) =>{
    setSelectedItem(item)
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const confirmDelete = () => {
    if(selectedItem){
      deleteChecklistCategory(selectedItem);
      setIsModalOpen(false);
    }
  }

  const { mutateAsync: deleteChecklistCategory } = useDeleteChecklistCategory();
  const { register, handleSubmit, reset } = useForm<CategoryAdd>({
		defaultValues: {
			title: "",
		},
		resolver: yupResolver(schema),
	});

  const { mutate } = useAddChecklistCategory(checklistId ?? '', {
		onSuccess: () => {
			queryClient.invalidateQueries(['checklist-categories'])
      toast.success('Successfully added!');
      reset();
      setAddItem(!addItem);
		},
    onError: (error) => {
      toast.error(`${error.response?.data?.error?.message} ${error.response.data.error.details}`)
    },
	})

  const onSubmit = handleSubmit((values) => {
		mutate(values);
	});

  const columns = useMemo<ColumnDef<CategoryAttr>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'sections',
        header: 'Sections',
        size: 120,
        cell: (info) =>
          <div>
            {info.row.original.sections.length}
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
							onClick={() => navigate(`/organization/${organization}/checklist/${checklistId}/categories/${info.row.original.id}`)}
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
              onClick={() => handleDelete({ checklistId: checklistId || '', categoryId: info.row.original.id })}
						>
							<FaTrash />
						</button>
					</Tooltip>
				</div>
      },
    ]
    , [checklistId, navigate, organization]);

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <ModalConfirmation confirmDelete={confirmDelete} onClose={closeModal} isOpen={isModalOpen}/>
      <ChecklistFields />
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Categories ({data?.length})</h2>
          <button className="bg-white text-red-400 hover:border-red-400" onClick={toggleAddItem}>+ Add Category</button>
        </div>
        <Table data={data || []} isLoading={isLoading} columns={columns}/>
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
  )
}

export default ChecklistDetails;