import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import useBundleList, { type BundleItem } from "./service"
import { BeatLoader } from 'react-spinners';
import { format } from 'date-fns';
import { FaTrash } from "react-icons/fa";

const columnHelper = createColumnHelper<BundleItem>()


const columns = [
  columnHelper.accessor('title', {
    header: 'Title',
  }),
  columnHelper.accessor('tests_count', {
    header: 'Test',
  }),
  columnHelper.accessor('checklists_count', {
    header: 'Checklist',
  }),
  columnHelper.accessor('courses_count', {
    header: () => 'Mandatories',
  }),
  columnHelper.accessor('updated_at', {
    header: 'Date Modified',
    cell: info => <span>{info.getValue() ? format(new Date(info.getValue()), 'PP') : ''}</span>,
  }),
  columnHelper.display({
    id: 'd',
    size: 80,
    cell: () => <div className='flex justify-center text-base'><FaTrash title="Delete"/></div>
  }),
];

const Table = () => {

  const { data, isLoading } = useBundleList({ params: { page: 1, items: 20 } })

  const table = useReactTable({
    data: data || [],
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
          ))
          }
        </tbody>
      </table>
    </div>
  )
};

export default Table