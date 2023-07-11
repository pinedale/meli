import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import  { useDeleteChecklist, useChecklist } from './service';
import { type ChecklistItem } from "./service";
import { format } from 'date-fns';
import { BeatLoader } from 'react-spinners';
import { HiEye } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';
import { Tooltip } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../../contexts/fetchProvider';

const columnHelper = createColumnHelper<ChecklistItem>()


const Table: React.FC = () => {
  const navigate = useNavigate();
  const {organization} = useFetch()
  const { data, isLoading } = useChecklist({ params: { page: 1, items: 20 } })

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
    }),
    columnHelper.accessor('categories_count', {
      header: 'Categories',
    }),
    columnHelper.accessor('sections_count', {
      header: 'Setions',
    }),
    columnHelper.accessor('questions_count', {
      header: 'Questions',
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
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.id, {
      id: 'actions',
      header: 'Actions',
      size: 70,
      cell: (info) =>
        <div className='flex justify-center text-base gap-2'>
          <Tooltip content="View checklist">
            <button data-tooltip-target="tooltip-dark" type="button" className='px-1' onClick={() => handleOpenModal(info.row.original.id)}>
              <HiEye />
            </button>
          </Tooltip>
          <Tooltip content="Delete checklist">
            <button type="button" className='px-1' onClick={() => deleteChecklist(info.row.original.id)}><FaTrash /></button>
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
    navigate(`/organization/${organization}/checklist/${itemId}`)
  };
  
  const {mutateAsync:deleteChecklist} = useDeleteChecklist()

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
    </div>
  )
};

export default Table