import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import { type Question, type QuestionForm, useGetChecklistSection, useAddChecklistSectionQuestion } from './services';
import Table from '../../../../components/Table';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { Button } from "flowbite-react";
import { BeatLoader } from "react-spinners";

const schema = yup.object({
	title: yup.string().required("Required field"),
})

const TableSection: React.FC = () => {
	const { checklistId, categoryId } = useParams();
	const { data, isLoading } = useGetChecklistSection(checklistId || "", categoryId || "");
	const [showFormForItem, setShowFormForItem] = useState<{ [key: string]: boolean }>({});
	const queryClient = useQueryClient();
	const [sectionId, setSectionId] = useState<string>()
	console.log("🚀 ~ file: index.tsx:28 ~ dass:", data)

	const columns = useMemo<ColumnDef<Question>[]>(() =>
		[
			{
				accessorKey: 'title',
				header: 'Title',
				size: 150,
			},
		]
		, []);


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

	if (isLoading) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

	if ( data?.sections.length == 0) return <p>No sections have been added to this category. Click the + Add New Section button on the bottom right of the page.</p>

	return (
		<div>
			{
				data?.sections?.map(item => (
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
								+ Add Item
							</Button>
						</div>
						<div className="overflow-hidden mb-10">
							{item.questions.length > 0
								? <>
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
								: <p className="border-t border-gray-300 text-xs pt-2">No items have been added to this section yet.</p>
							}

						</div>
					</div>
				))
			}
		</div>
	)
};

export default TableSection;