import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import useTestList, { type TestItem } from "./service";
import { format } from 'date-fns';
import { BeatLoader } from 'react-spinners';
import { Tooltip } from 'flowbite-react';
import { HiEye } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';

const columnHelper = createColumnHelper<TestItem>()

type TableProps = {
  onOpenModal: (arg: number) => void;
}

const Table: React.FC<TableProps> = ({ onOpenModal }) => {

  const { data, isLoading } = useTestList({ params: { page: 1, items: 20 } })

  const columns = [
    columnHelper.accessor(row => row.title, {
      id: 'title',
      cell: info => <b>{info.getValue()}</b>,
      header: () => <span>Title</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.passing_score, {
      id: 'passing_score',
      cell: info => <span>{info.getValue()}%</span>,
      header: () => <span>Passing Score</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.categories_count, {
      id: 'categories_count',
      cell: info => <span>{info.getValue()}</span>,
      header: () => <span>Categories</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.questions_count, {
      id: 'questions_count',
      cell: info => <span>{info.getValue()}</span>,
      header: () => <span>Questions</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.updated_at, {
      id: 'updated_at',
      cell: info => <span>{info.getValue() ? format(new Date(info.getValue()), 'PP') : ''}</span>,
      header: () => <span>Date Modified</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.status, {
      id: 'status',
      cell: info => <span className={info.getValue() === "active" ? "text-green-app" : "text-gray-600"}>{info.getValue()}</span>,
      header: () => <span>Status</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.id, {
      id: 'actions',
      header: 'Actions',
      size: 70,
      cell: (info) =>
        <div className='flex text-base gap-2'>
          <Tooltip content="View details">
            <button
              data-tooltip-target="tooltip-dark"
              type="button"
              className='px-1'
              onClick={() => handleOpenModal(info.row.original.id)}
            >
              <HiEye />
            </button>
          </Tooltip>
          <Tooltip content="Delete">
            <button type="button" className='px-1'><FaTrash /></button>
          </Tooltip>
        </div>
    }),
  ]

  const table = useReactTable({
    data: data ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleOpenModal = (itemId: number) => {
    onOpenModal(itemId);
  };

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