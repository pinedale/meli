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
import { type ChapterAdd, useGetMandatoryChapterDetails, type QuestionAttr, useAddMandatoryChapterQuestion } from './services';
import { BeatLoader } from 'react-spinners';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFetch } from '../../../../contexts/fetchProvider';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const columnHelper = createColumnHelper<QuestionAttr>()

const schema = yup.object({
	title: yup.string().required("Required field"),
})

type TableQuestionsProps = {
	addChapter: boolean;
	toggleChapter:() => void;
}

const TableQuestions: React.FC<TableQuestionsProps> = ({ addChapter, toggleChapter }) => {
	const { organization } = useFetch();
	const { mandatoryId, chapterId } = useParams()
	const { data, isLoading } = useGetMandatoryChapterDetails(mandatoryId, chapterId)

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
						>
							<FaTrash />
						</button>
					</Tooltip>
				</div>
		}),
	]

	const table = useReactTable({
		data: data ? data : [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

  const { mutate } = useAddMandatoryChapterQuestion(mandatoryId ?? '', chapterId ?? '', {
		onSuccess: () => {
			reset()
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

  useEffect(() => {
    reset()
  }, [reset, toggleChapter]);

	if (isLoading) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

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
				addChapter && (
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
									<button type="button" onClick={toggleChapter} className="bg-white text-red-400 hover:border-red-400">Cancel</button>
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

export default TableQuestions