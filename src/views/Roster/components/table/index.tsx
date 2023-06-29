import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import useUsers, { UserItem } from './service'
import { BeatLoader } from 'react-spinners';

const columnHelper = createColumnHelper<UserItem>()

const columns = [
  columnHelper.accessor('first_name', {
    header: 'Name',
  }),
  columnHelper.accessor('role', {
    header: 'Role',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('checklists.finished', {
    header: 'Skills Checklist',
  }),
  columnHelper.accessor('tests.finished', {
    header: 'Tests',
  }),
  columnHelper.accessor('courses.finished', {
    header: 'Mandatories',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.display({
    id: 'ladale',
    cell: () => 'Leandro la deja sequita!'
  }),
]
const Table = () => {
  const { data = [], isLoading } = useUsers({ params: { page: 1, items: 20 } })

  
  const table = useReactTable({
    data: data,
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