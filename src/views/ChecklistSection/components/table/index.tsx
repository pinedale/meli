import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Tooltip } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import { type Question } from "../table-section/services";

const columnHelper = createColumnHelper<Question>();

type TableMainProps = {
  dataSection: Array<Question>;
}

const TableMain:React.FC<TableMainProps> = ({dataSection}) => {

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
    }),
    columnHelper.accessor('rank', {
      header: 'Sections',
    }),
    columnHelper.accessor('id', {
      header: 'Items',
    }),

    columnHelper.accessor(row => row.id, {
      id: 'actions',
      header: 'Actions',
      size: 70,
      cell: () =>
        <div className='flex justify-center text-base gap-2'>
          <Tooltip content="View details">
            <button

              data-tooltip-target="tooltip-dark"
              type="button" className='px-1'
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
    data: dataSection,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
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
  )
}

export { TableMain }