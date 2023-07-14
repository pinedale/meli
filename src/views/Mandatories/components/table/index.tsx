import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns';
import { useGetCourses, type CourseItem } from "./service"
import { BeatLoader } from 'react-spinners';
import { Tooltip } from 'flowbite-react';
import { HiEye } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../../contexts/fetchProvider';

const columnHelper = createColumnHelper<CourseItem>()

const Table = () => {
  const navigate = useNavigate();
  const {organization} = useFetch();

  const columns = [
    columnHelper.accessor(row => row.title, {
      id: 'title',
      cell: info => <span>{info.getValue()}</span>,
      header: () => <span>Title</span>,
    }),
    columnHelper.accessor(row => row.chapters_count, {
      id: 'chapters_count',
      cell: info => <span>{info.getValue()}</span>,
      header: () => <span>Chapters</span>,
    }),
    columnHelper.accessor(row => row.questions_count, {
      id: 'questions_count',
      cell: info => <span>{info.getValue()}</span>,
      header: () => <span>Questions</span>,
    }),
    columnHelper.accessor(row => row.updated_at, {
      id: 'updated_at',
      cell: info => <span>{info.getValue() ? format(new Date(info.getValue()), 'PP') : ''}</span>,
      header: () => <span>Date Modified</span>,
    }),
    columnHelper.accessor(row => row.status, {
      id: 'status',
      cell: info => <span className={info.getValue() === "active" ? "text-green-app" : "text-gray-600"}>{info.getValue()}</span>,
      header: () => <span>Status</span>,
    }),
    columnHelper.display({
      id: 'a',
      header: 'Actions',
      size: 120,
      cell: (info) =>
        <div className='flex text-base gap-2'>
          <Tooltip content="View details">
            <button
              data-tooltip-target="tooltip-dark"
              type="button"
              className='px-1'
              onClick={()=> navigate(`/organization/${organization}/mandatories/${info.row.original.id}`)}
            >
              <HiEye />
            </button>
          </Tooltip>
          <Tooltip content="Remove">
            <button type="button" className='px-1'><FaTrash /></button>
          </Tooltip>
        </div>
    }),
  ]
  const { data, isLoading } = useGetCourses({ params: { page: 1, items: 20 } })

  const table = useReactTable({
    data: data ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="table-fixed w-full border-gray-400 text-slate-500 border-collapse text-xs divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className="py-3 bg-slate-100 text-left px-2" key={header.id}>
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
    </div>
  )
};

export default Table