import { useEffect, useMemo, useState } from "react";
import Summary from "../../components/Summary";

import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { ChecklistItem, useChecklist, useDeleteChecklist } from "./services";
import { format } from "date-fns";
import { Pagination, Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import Table from "../../components/Table";
import { useFetch } from "../../contexts/fetchProvider";

const Checklist = () =>{
  const { organization } = useFetch()
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  })
  const navigate = useNavigate();
  const { data, isLoading } = useChecklist({ params: { page: paginationParams.page, items: 20 } });

  useEffect(() => {
    if (data?.meta.pagination) {
      setPaginationParams((prev) => ({
        ...prev,
        page: data.meta.pagination.page,
        totalPages: data.meta.pagination.last,
        totalItems: data.meta.pagination.count,
      }))
    }

  }, [data?.meta.pagination])

  const onPageChange = (page: number) => {
    setPaginationParams((prev) => ({
      ...prev,
      page: page,
    }))

  }

  const {mutateAsync:deleteChecklist} = useDeleteChecklist()

  const columns = useMemo<ColumnDef<ChecklistItem>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 200,
      },
      {
        accessorKey: 'categories_count',
        header: 'Categories',
        size: 80,
      },
      {
        accessorKey: 'sections_count',
        header: 'Sections',
        size: 80,
      },
      {
        accessorKey: 'questions_count',
        header: 'Questions',
        size: 80,
      },
      {
        accessorKey: 'updated_at',
        header: 'Date Modified',
        size: 100,
        cell: info => <span>{info.getValue() ? format(new Date(info.row.original.updated_at), 'PP') : ''}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: info => <span className={info.getValue() === "active" ? "text-green-app" : "text-gray-600"}>{info.row.original.status}</span>,
      },
      {
        accessorKey: 'id',
        header: 'Actions',
        size: 100,
        cell: (info) =>
          <div className='flex text-base gap-2'>
            <Tooltip content="View Profile">
              <button
                data-tooltip-target="tooltip-dark"
                type="button"
                className='px-1'
                onClick={() => navigate(`/organization/${organization}/checklist/${info.row.original.id}`)}
              >
                <HiEye />
              </button>
            </Tooltip>
            <Tooltip content="Remove">
            <button type="button" className='px-1' onClick={() => deleteChecklist(info.row.original.id)}><FaTrash /></button>
            </Tooltip>
          </div>
      },
    ]
    , [deleteChecklist, navigate, organization]);

  return(
    <>
      <Summary stats={data?.meta.stats}/>
      <div className="py-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button
            className="bg-white text-red-400 hover:border-red-400"
            onClick={() => navigate(`/organization/${organization}/checklist/new`)}
          >
            + Create New Checklist
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <Table data={data?.checklists || []} isLoading={isLoading} columns={columns}/>
        {paginationParams.totalItems >= 20 && <Pagination className="mb-8" currentPage={paginationParams.page} onPageChange={onPageChange} totalPages={paginationParams.totalPages} />}
      </div>
    </>
  )
};

export default Checklist