import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import useChecklist from './service'
import {type CourseItem} from "./service"

type Person = {
  title: string
  type: string
  test: number
  checklist: number
  status: string
  mandatories: number
}

const defaultData: CourseItem[] = []

const columnHelper = createColumnHelper<CourseItem>()

const columns = [
  columnHelper.accessor(row => row.title, {
    id: 'title',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Title</span>,
  }),
  columnHelper.accessor(row => row.chapters_count, {
    id: 'chapters_count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Chapters</span>,
  }),
  columnHelper.accessor(row => row.questions_count, {
    id: 'questions_count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Questions</span>,
  }),
  columnHelper.accessor(row => row.updated_at, {
    id: 'updated_at',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Date Modified</span>,
  }),
  columnHelper.accessor(row => row.status, {
    id: 'status',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Status</span>,
  }),
]
const Table = () => {

  const { data  } = useChecklist({params: {page: 1, items: 20}})
  console.log("🚀 ~ file: index.tsx:81 ~ Table ~ requestData:", data)

  const table = useReactTable({
    data: data ? data : [],
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