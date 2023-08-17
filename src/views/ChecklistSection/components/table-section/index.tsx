import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import { type QuestionForm, useGetChecklistSection, useAddChecklistSectionQuestion, DeleteChecklistQuestionParams, useDeleteChecklistQuestion, Section } from './services';
import Table from '../../../../components/Table';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { Button, Tooltip } from "flowbite-react";
import { BeatLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";
import ModalConfirmation from "../../../../components/ModalConfirmation";

const schema = yup.object({
	title: yup.string().required("Required field"),
})

type Question = {
  id: string;
  title: string;
  rank: string;
	section_id?: string;
}

const TableSection: React.FC = () => {
	const { checklistId, categoryId } = useParams();
	const { data, isLoading } = useGetChecklistSection(checklistId || "", categoryId || "");
	const [showFormForItem, setShowFormForItem] = useState<{ [key: string]: boolean }>({});
	const queryClient = useQueryClient();
	const [sectionId, setSectionId] = useState<string>();
	const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DeleteChecklistQuestionParams>();
	const { mutateAsync: deleteChecklistQuestion } = useDeleteChecklistQuestion();

	const handleDelete = (item: DeleteChecklistQuestionParams) => {
    setSelectedItem(item)
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const confirmDelete = () => {
    if (selectedItem) {
      deleteChecklistQuestion(selectedItem);
      setIsModalOpen(false);
    }
  }

	const columns = useMemo<ColumnDef<Question>[]>(() =>
		[
			{
				accessorKey: 'title',
				header: 'Question title',
				size: 150,
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
								onClick={() => handleDelete({ checklistId: checklistId || "", categoryId: categoryId || "", sectionId: info.row.original.section_id || '', questionId: info.row.original.id || "" })}
							>
								<FaTrash />
							</button>
						</Tooltip>
					</div>
			},
		]
		, [categoryId, checklistId]);


	const toggleAddItem = (itemId: string) => {
		setSectionId(itemId)
		setShowFormForItem(prevState => ({
			...prevState,
			[itemId]: !prevState[itemId],
		}));
	};

	const hideForm = (itemId: string) => {
		toggleAddItem(itemId);
		setShowFormForItem(prevState => ({
			...prevState,
			[itemId]: false,
		}));
	};

	const { mutate } = useAddChecklistSectionQuestion(checklistId ?? '', categoryId ?? '', sectionId ?? '', {
		onError: (error) => {
			toast.error(error.response?.data?.error?.message)
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['checklist-sections'])
			toast.success('Successfully added!');
			reset();
			setShowFormForItem(prevState => ({
				...prevState,
				[sectionId as string]: false,
			}));
		}
	})

	const { register, handleSubmit, reset } = useForm<QuestionForm>({
		defaultValues: {
			title: "",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit((values) => {
		mutate(values)
	});

	const newSectionData: Section[] = data?.sections.map((section) => ({
		...section,
		questions: section.questions.map((question) => ({
			...question,
			section_id: section.id,
		})),
	}))|| [];
	console.log("🚀 ~ file: index.tsx:123 ~ constnewArray:Section[]=data?.map ~ newArray:", newSectionData)

	if (isLoading) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

	if ( data?.sections.length == 0) return <p>No sections have been added to this category. Click the + Add New Section button on the bottom right of the page.</p>

	return (
		<div>
			{
				newSectionData.map(item => (
					<div key={item.id}>
						<div className="flex justify-between mb-2">
							<h2>{item.title} ({item.questions.length})</h2>
							<Button
								size="xs"
								color="light"
								type="button"
								onClick={() => toggleAddItem(item.id)}
								className="border-red-500 hover:border-red-500 text-red-app focus:outline-none focus:shadow-none focus:ring-0"
							>
								+ Add Itemss
							</Button>
						</div>
						<div className="overflow-hidden mb-10">
							{item.questions.length > 0
								? <>
									<ModalConfirmation confirmDelete={confirmDelete} onClose={closeModal} isOpen={isModalOpen} />
									<Table columns={columns} data={item.questions} isLoading={isLoading} />
									{
										showFormForItem[item.id] && (
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
															<button onClick={() => hideForm(item.id)} type="button" className="bg-white text-red-400 hover:border-red-400">Cancel</button>
															<button type="submit" className="bg-white text-red-400 hover:border-red-400">Save</button>
														</div>
													</div>
												</form>
											</div>
										)
									}
								</>
								: <>
									<p className="border-t border-gray-300 text-xs pt-2">No items have been added to this section yet.</p>
									{
										showFormForItem[item.id] && (
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
															<button onClick={() => hideForm(item.id)} type="button" className="bg-white text-red-400 hover:border-red-400">Cancel</button>
															<button type="submit" className="bg-white text-red-400 hover:border-red-400">Save</button>
														</div>
													</div>
												</form>
											</div>
										)
									}
								</>
							}

						</div>
					</div>
				))
			}
		</div>
	)
};

export default TableSection;