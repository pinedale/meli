import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';


import { HiEye } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';
import { Tooltip } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryAdd, useAddChecklistCategory, useDeleteChecklistCategory, useGetChecklistCategories } from './services';
import { type CategoryAttr } from './services';
import { BeatLoader } from 'react-spinners';
import { useFetch } from '../../../contexts/fetchProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';

const columnHelper = createColumnHelper<CategoryAttr>()

const schema = yup.object({
	title: yup.string().required("Required field"),
})

type TableCategoryProps = {
	addCategory: boolean;
	toggleCategory:() => void;
}

const TableCategory: React.FC<TableCategoryProps> = ({ addCategory, toggleCategory }) => {
	const { organization } = useFetch();
	const { checklistId } = useParams()
	const { data, isFetching } = useGetChecklistCategories(checklistId)

	const navigate = useNavigate();
	const columns = [
		columnHelper.accessor('title', {
			header: 'Title',
		}),
		columnHelper.accessor('rank', {
			header: 'Sections',
		}),
		columnHelper.accessor('id', {
			header: 'Items',
		}),

		columnHelper.accessor(row => row.id, {
			id: 'actions',
			header: 'Actions',
			size: 70,
			cell: (info) =>
				<div className='flex justify-center text-base gap-2'>
					<Tooltip content="View details">
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
							onClick={() => deleteBundle({ checklistId: checklistId || '', categoryId: info.row.original.id })}
						>
							<FaTrash />
						</button>
					</Tooltip>
				</div>
		}),
	]

	const { register, handleSubmit } = useForm<CategoryAdd>({
		defaultValues: {
			title: "",
		},
		resolver: yupResolver(schema),
	});

	const { mutate } = useAddChecklistCategory(checklistId ?? '', {
		onSuccess: () => {
			toast.success("The category has been created successfully");
		}
	})

	const table = useReactTable({
		data: data ? data : [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	const onSubmit = handleSubmit((values) => {
		mutate(values);
	});

	const { mutateAsync: deleteBundle } = useDeleteChecklistCategory()

	if (isFetching) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

	return (
		<div className="overflow-hidden border rounded-lg mb-10">
			<table className="table-fixed w-full border-gray-400 text-slate-500 border-collapse text-xs divide-y divide-gray-200">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th
									className="py-3 bg-slate-100 text-left px-2"
									key={header.id}
									style={{
										width:
											header.getSize() ? header.getSize() : undefined,
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id} className="even:bg-gray-100">
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className="py-3 px-2">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{
				addCategory && (
					<div className="border-t-2 p-1">
						<form onSubmit={onSubmit}>
							<div className="flex">
								<input
									type="text"
									placeholder="Enter Title"
									className="w-full px-2 py-2 border-gray-200 text-xs rounded"
									{...register('title', { required: 'Required field' })}
								/>
								<div className="flex gap-2 px-1">
									<button type="button" onClick={toggleCategory} className="bg-white text-red-400 hover:border-red-400">Cancel</button>
									<button type="submit" className="bg-white text-red-400 hover:border-red-400">Save</button>
								</div>
							</div>
						</form>
					</div>

				)
			}
		</div>
	)
};

export default TableCategory