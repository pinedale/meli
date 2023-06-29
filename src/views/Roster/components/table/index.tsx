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
  columnHelper.accessor(row => row.first_name, {
    id: 'first_name',
    cell: info => <span>{info.getValue()}</span>,
    header: () => <span>Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.role, {
    id: 'role',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Role</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.email, {
    id: 'email',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Email</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.checklists, {
    id: 'row.checklists',
    cell: info => <span>{info.getValue().finished}</span>,
    header: () => <span>Skills Checklist</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.tests, {
    id: 'row.tests',
    cell: info => <span>{info.getValue().finished}</span>,
    header: () => <span>tests</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.courses, {
    id: 'row.courses',
    cell: info => <span>{info.getValue().finished}</span>,
    header: () => <span>Mandatories</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.status, {
    id: 'row.status',
    cell: info => <span>{info.getValue()}</span>,
    header: () => <span>Status</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
]
const Table = () => {
  const { data, isLoading } = useUsers({ params: { page: 1, items: 20 } })

  const table = useReactTable({
    data: data ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
          {isLoading
            ? <tr><td className="text-center p-3" colSpan={6}><div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div></td></tr>
            : table.getRowModel().rows.map(row => (
              <tr key={row.id} className="even:bg-gray-100">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-3 px-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
};

export default Table