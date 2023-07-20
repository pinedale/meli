import { useEffect, useMemo, useState } from "react";
import Summary from "../../components/Summary";
import Modal from "../../components/Modal";
import TestFields from "./components/test-fields";
import Table from "../../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import useTestList, { TestItem } from "./service";
import { Pagination, Tooltip } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { format } from "date-fns";

const Test = () => {
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    totalPages: 1,
  })
  const { organization } = useFetch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useTestList({ params: { page: paginationParams.page, items: 20 } });
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null)
  };

  const columns = useMemo<ColumnDef<TestItem>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'passing_score',
        header: 'Passing Score',
        size: 120,
      },
      {
        accessorKey: 'categories_count',
        header: 'Categories',
        size: 220,
      },
      {
        accessorKey: 'questions_count',
        header: 'Questions',
        size: 120,
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
        size: 120,
        cell: (info) =>
          <div className='flex justify-center text-base gap-2'>
            <Tooltip content="View Profile">
              <button
                data-tooltip-target="tooltip-dark"
                type="button"
                className='px-1'
                onClick={() => navigate(`/organization/${organization}/test/${info.row.original.id}`)}
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
          <button className="bg-white text-red-400 hover:border-red-400" onClick={openModal}> + Create New Test</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <Table data={data?.tests || []} isLoading={isLoading} columns={columns}/>
        <Pagination className="mb-8" currentPage={paginationParams.page} onPageChange={onPageChange} totalPages={paginationParams.totalPages} />
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <TestFields onClose={closeModal} id={selectedItemId}/>
      </Modal>
    </>
  )
};

export default Test