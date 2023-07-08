import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import useUsers, { UserItem } from './service'
import { BeatLoader } from 'react-spinners';
import { FaTrash } from 'react-icons/fa';
import { HiEye } from 'react-icons/hi';
import { Tooltip } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const columnHelper = createColumnHelper<UserItem>()

type TableProps = {
  onOpenModal: (arg: string) => void;
}

const Table: React.FC<TableProps> = ({onOpenModal}) => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useUsers({ params: { page: 1, items: 20 } })

  const columns = [
    columnHelper.accessor('first_name', {
      header: 'Name',
      size: 150,
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      size: 120,
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      size: 220,
    }),
    columnHelper.accessor('checklists.finished', {
      header: 'Skills Checklist',
      size: 120,
    }),
    columnHelper.accessor('tests.finished', {
      header: 'Tests',
      size: 100,
    }),
    columnHelper.accessor('courses.finished', {
      header: 'Mandatories',
      size: 120,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      size: 100,
    }),
    columnHelper.display({
      id: 'a',
      header: 'Actions',
      size: 120,
      cell: (info) =>
        <div className='flex justify-center text-base gap-2'>
          <Tooltip content="View Profile">
            <button data-tooltip-target="tooltip-dark" type="button" className='px-1' onClick={() => handleOpenModal(info.row.original.id)}>
              <HiEye />
            </button>
          </Tooltip>
          <Tooltip content="Remove">
            <button type="button" className='px-1'><FaTrash /></button>
          </Tooltip>
        </div>
    }),
  ]

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleOpenModal = (itemId: string) => {
    navigate(`/roster/${itemId}`);
    onOpenModal(itemId);
  };

  if (isLoading) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="table-fixed w-full border-gray-400 text-slate-500 border-collapse text-xs divide-y divide-gray-200 mb-4">
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
        <tbody className=''>
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