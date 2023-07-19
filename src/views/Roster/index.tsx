import { useEffect, useMemo, useState } from "react";
import Summary from "../../components/Summary";
import Modal from "../../components/Modal";
import RostertFields from "./components/roster-fields";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { ColumnDef } from "@tanstack/react-table";
import useUsers, { type UserItem } from "./components/table/service";
import { Pagination, Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import Table from "../../components/Table";

const Roster = () => {
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    totalPages: 1,
  })
  const { organization } = useFetch()
  console.log("🚀 ~ file: index.tsx:20 ~ Roster ~ organization:", organization)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean | undefined>(false);
  const navigate = useNavigate();
  const { data, isLoading } = useUsers({ params: { page: paginationParams.page, items: 20 } });

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
    setIsEditing(false);
    setSelectedItemId(null)
    navigate(`/organization/${organization}/roster`);
  };

  const columns = useMemo<ColumnDef<UserItem>[]>(() =>
    [
      {
        accessorKey: 'first_name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 120,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 220,
      },
      {
        accessorKey: 'checklists.finished',
        header: 'Skills Checklist',
        size: 120,
      },
      {
        accessorKey: 'tests.finished',
        header: 'Tests',
        size: 100,
      },
      {
        accessorKey: 'courses.finished',
        header: 'Mandatories',
        size: 120,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
      },
      {
        accessorKey: 'id',
        header: 'Actions',
        size: 120,
        cell: () =>
          <div className='flex justify-center text-base gap-2'>
            <Tooltip content="View Profile">
              <button data-tooltip-target="tooltip-dark" type="button" className='px-1'>
                <HiEye />
              </button>
            </Tooltip>
            <Tooltip content="Remove">
              <button type="button" className='px-1'><FaTrash /></button>
            </Tooltip>
          </div>
      },
    ]
    , []);

  return (
    <>
      <Summary stats={data?.meta.stats} />
      <div className="py-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button className="bg-white text-red-400 hover:border-red-400" onClick={openModal}> + Create New Member</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <Table data={data?.users || []} isLoading={isLoading} columns={columns} />
        <Pagination className="mb-8" currentPage={paginationParams.page} onPageChange={onPageChange} totalPages={paginationParams.totalPages} />
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <RostertFields onClose={closeModal} id={selectedItemId} isEditing={isEditing} />
      </Modal>
    </>
  )
};

export default Roster