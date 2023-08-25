import { useEffect, useMemo, useState } from "react";
import Summary from "../../components/Summary";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { ColumnDef } from "@tanstack/react-table";
import { Pagination, Select, TextInput, Tooltip } from "flowbite-react";
import { HiEye, HiSearch } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import Table from "../../components/Table";
import ModalConfirmation from "../../components/ModalConfirmation";
import { useGetUsers, type UserItem, useDeleteRoster } from "./services";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

const Roster = () => {
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    totalPages: 1,
  })
  const { organization } = useFetch();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string>();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedSearch, setSelectedSearch] = useState<string>("");
  const { mutateAsync: deleteRoster } = useDeleteRoster();
  const { data, isFetching } = useGetUsers({ params: { page: paginationParams.page, items: 20, role: selectedRole, search: selectedSearch } });

  const handleDelete = (item: string) => {
    setSelectedItem(item)
    setIsConfirmationModalOpen(true);
  }

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  }

  useEffect(() => {
    if (data?.meta.pagination) {
      setPaginationParams((prev) => ({
        ...prev,
        page: data.meta.pagination.page,
        totalPages: data.meta.pagination.last,
      }))
    }

  }, [data?.meta.pagination])

  const confirmDelete = () => {
    if (selectedItem) {
      deleteRoster({ user_id: selectedItem });
      setIsConfirmationModalOpen(false);
    }
  }

  const onPageChange = (page: number) => {
    setPaginationParams((prev) => ({
      ...prev,
      page: page,
    }))

  }

  const columns = useMemo<ColumnDef<UserItem>[]>(() =>
    [
      {
        accessorKey: 'first_name, last_name',
        header: 'Name',
        size: 150,
        cell: (info) =>
          <div>
            {info.row.original.first_name} {info.row.original.last_name}
          </div>
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
        accessorKey: 'checklists',
        header: 'Skills Checklist',
        size: 120,
        cell: (info) =>
          <div className='flex justify-center gap-2'>
            <span>{info.row.original.checklists.finished}-<span className=" text-red-600 text-xs">({info.row.original.checklists.untaken})</span></span>
          </div>
      },
      {
        accessorKey: 'tests',
        header: 'Tests',
        size: 100,
        cell: (info) =>
          <div className='flex justify-center gap-2'>
            <span>{info.row.original.tests.finished}-<span className=" text-red-600 text-xs">({info.row.original.tests.untaken})</span></span>
          </div>
      },
      {
        accessorKey: 'courses',
        header: 'Mandatories',
        size: 120,
        cell: (info) =>
          <div className='flex justify-center gap-2'>
            <span>{info.row.original.courses.finished}-<span className=" text-red-600 text-xs">({info.row.original.courses.untaken})</span></span>
          </div>
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
        cell: (info) =>
          <div className='flex justify-center text-base gap-2'>
            <Tooltip content="View Profile">
              <button
                data-tooltip-target="tooltip-dark"
                type="button"
                className='px-1'
                onClick={() => navigate(`/organization/${organization}/roster/${info.row.original.id}`)}
              >
                <HiEye />
              </button>
            </Tooltip>
            <Tooltip content="Remove">
              <button onClick={() => handleDelete(info.row.original.id)} type="button" className='px-1'><FaTrash /></button>
            </Tooltip>
          </div>
      },
    ]
    , [navigate, organization]);

  const { register, handleSubmit } = useForm<{ role: string, search: string }>({
    defaultValues: {
      role: "",
    },
    mode: "onChange"
  });

  const onSubmit = handleSubmit((values) => {
    setSelectedRole(values.role);
    setSelectedSearch(values.search);
    queryClient.invalidateQueries(['users']);
  });

  return (
    <>
      <Summary stats={data?.meta.stats} />
      <div className="max-w-6xl mx-auto">
        <ModalConfirmation confirmDelete={confirmDelete} onClose={closeConfirmationModal} isOpen={isConfirmationModalOpen} />
        <form onChange={onSubmit}>
          <div className="flex justify-between pt-4 mb-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Select
                  {...register("role")}
                >
                  <option value="">All</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="recruiter">Recruiter / QA</option>
                  <option value="nurse">Healthcare Professional</option>
                </Select>
              </div>
              <div>
                <TextInput
                  icon={HiSearch}
                  id="email4"
                  placeholder="Search users"
                  required
                  type="email"
                  {...register("search")}
                />
              </div>
            </div>
            <button className="bg-white text-red-400 hover:border-red-400" onClick={() => navigate(`/organization/${organization}/roster/new`)}> + Create New Member</button>
          </div>
        </form>
        {data?.users?.length && data?.users?.length > 0 ? <Table data={data?.users || []} isLoading={isFetching} columns={columns} /> : <p>There is no user to display</p>}

        {paginationParams.totalPages >= 20 && <Pagination className="mb-8" currentPage={paginationParams.page} onPageChange={onPageChange} totalPages={paginationParams.totalPages} />}
      </div>
    </>
  )
};

export default Roster