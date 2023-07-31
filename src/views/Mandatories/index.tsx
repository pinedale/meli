import { useEffect, useMemo, useState } from "react";
import Summary from "../../components/Summary";
import { CourseItem, useGetCourses } from "./services";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Pagination, Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";

const Mandatories = () =>{
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    totalPages: 1,
  })

  const {organization} = useFetch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCourses({ params: { page: paginationParams.page, items: 20 } });

  useEffect(() => {
    if (data?.meta.pagination) {
      setPaginationParams((prev) => ({
        ...prev,
        page: data.meta.pagination.page,
        totalPages: data.meta.pagination.last,
      }))
    }

  }, [data?.meta.pagination])

  const onPageChange = (page: number) => {
    setPaginationParams((prev) => ({
      ...prev,
      page: page,
    }))

  }

  const columns = useMemo<ColumnDef<CourseItem>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'chapters_count',
        header: 'Chapters',
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
            <Tooltip content="View details">
              <button
                data-tooltip-target="tooltip-dark"
                type="button"
                className='px-1'
                onClick={()=> navigate(`/organization/${organization}/mandatories/${info.row.original.id}`)}
              >
                <HiEye />
              </button>
            </Tooltip>
            <Tooltip content="Remove">
              <button type="button" className='px-1'><FaTrash /></button>
            </Tooltip>
          </div>
      },
    ]
    , [navigate, organization]);

  return(
    <>
      <Summary stats={data?.meta.stats}/>
      <div className="py-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button
            className="bg-white text-red-400 hover:border-red-400"
            onClick={() => navigate(`/organization/${organization}/mandatories/new`)}
          >
            + Create New Course
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <Table data={data?.courses || []} isLoading={isLoading} columns={columns} />
        <Pagination className="mb-8" currentPage={paginationParams.page} onPageChange={onPageChange} totalPages={paginationParams.totalPages} />
      </div>
    </>
  )
};

export default Mandatories