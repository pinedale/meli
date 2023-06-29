import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import useChecklist from './service'
import { format } from 'date-fns';
import { type CourseItem } from "./service"
import { BeatLoader } from 'react-spinners';

const columnHelper = createColumnHelper<CourseItem>()

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
]
const Table = () => {

  const { data, isLoading } = useChecklist({ params: { page: 1, items: 20 } })
  console.log("🚀 ~ file: index.tsx:81 ~ Table ~ requestData:", data)

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
        <tbody>
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