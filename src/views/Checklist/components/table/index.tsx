import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import useChecklist from './service'
import {type ChecklistItem} from "./service"

const defaultData: ChecklistItem[] = []

const columnHelper = createColumnHelper<ChecklistItem>()

const columns = [
  columnHelper.accessor(row => row.title, {
    id: 'title',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Title</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.categories_count, {
    id: 'categories_count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Categories</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.sections_count, {
    id: 'sections_count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Setions</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.questions_count, {
    id: 'questions_count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Questions</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.updated_at, {
    id: 'updated_at',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Date Modified</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.status, {
    id: 'status',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Status</span>,
    footer: info => info.column.id,
  }),
]
const Table = () => {

  const { data, error, isLoading, isSuccess  } = useChecklist({params: {page: 1, items: 20}})
  console.log("🚀 ~ file: index.tsx:56 ~ Table ~ data:", data)

  const table = useReactTable({
    data: isSuccess ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const aaa = table.getRowModel().rows
  console.log("🚀 ~ file: index.tsx:63 ~ Table ~ aaa:", aaa)

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