import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import useBundleList, { type BundleItem } from "./service"
import { BeatLoader } from 'react-spinners';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<BundleItem>()


const columns = [
  columnHelper.accessor(row => row.title, {
    id: 'title',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Title</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.tests_count, {
    id: 'tests_count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Test</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.checklists_count, {
    id: 'checklists_count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Checklist</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.courses_count, {
    id: 'courses_count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Checklist</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.updated_at, {
    id: 'updated_at',
    cell: info => <span>{format(new Date(info.getValue()), 'PP')}</span>,
    header: () => <span>Date Modified</span>,
    footer: info => info.column.id,
  }),

];

const Table = () => {

  const { data, isLoading } = useBundleList({ params: { page: 1, items: 20 } })

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  console.log("🚀 ~ file: index.tsx:90 ~ Table ~ data:", data)

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
          {isLoading
            ? <tr><td className="text-center p-3" colSpan={8}><div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div></td></tr>
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