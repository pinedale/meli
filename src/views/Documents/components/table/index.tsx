import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import useChecklist from './service'

type Person = {
  title: string
  type: string
  test: number
  checklist: number
  status: string
  mandatories: number
}

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('title', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.type, {
    id: 'type',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Type</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('test', {
    header: () => 'Test',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('checklist', {
    header: () => <span>Checklist</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('mandatories', {
    header: 'Mandatories',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
]
const Table = () => {

  const { data  } = useChecklist({params: {page: 1, items: 20}})

  const table = useReactTable({
    data: [],
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