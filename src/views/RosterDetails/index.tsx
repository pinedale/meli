import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { useGetUserTest, type TestItem, useGetUserChecklist, type ChecklistItem, useGetUserCourses, type CourseItem, useDeleteMandatory, useGetRosterInfo } from "./services";
import Table from "../../components/Table";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Avatar, Spinner, Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import ModalConfirmation from "../../components/ModalConfirmation";
import { roles } from "../../utils/constants";

const RosterDetails: React.FC = () => {
  const { organization, roleType } = useFetch();
  const { rosterId } = useParams();
  const navigate = useNavigate();
  const { data: dataTest, isLoading: testLoading } = useGetUserTest(rosterId);
  const { data: dataChecklist, isLoading: checklistLoading } = useGetUserChecklist(rosterId);
  const { data: dataCourses, isLoading: coursesLoading } = useGetUserCourses(rosterId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ user_id: string | undefined; course_id: string; }>();
  const { mutateAsync: deleteMandatory } = useDeleteMandatory();
  const { data: rosterInfo, isFetching: rosterIsLoading } = useGetRosterInfo(rosterId || '');

  const userRosterInfo: "super_admin" | "admin" | "recruiter" | "nurse" =
    (rosterInfo?.role as keyof typeof roles) || "super_admin";
  const userLoggedIn: "super_admin" | "admin" | "recruiter" | "nurse" =
    (roleType as keyof typeof roles) || "super_admin";

  const valueUserInfo = roles[userRosterInfo];
  const valueLoggeedIn = roles[userLoggedIn];

  const handleDelete = (item: { user_id: string | undefined; course_id: string; }) => {
    setSelectedItem(item)
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const confirmDelete = () => {
    if (selectedItem) {
      deleteMandatory(selectedItem);
      setIsModalOpen(false);
    }
  }

  const columns = useMemo<ColumnDef<TestItem>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'status, ended_at',
        header: 'Status',
        size: 120,
        cell: (info) => {
          let itemStatus;
          switch (info.row.original.status) {
            case "finished":
              itemStatus = <b>Complete - </b>;
              break
            case "started":
              itemStatus = <span className=" font-bold text-blue-400">In Progress - </span>;
              break
            case "untaken":
              itemStatus = <span className=" font-bold text-red-500">Invite Sent - </span>;
              break
            default:
              itemStatus = "Unknown Status";
              break
          }
          return (
            <div className='flex gap-2'>
              <span>
                {itemStatus}
                {format(new Date(info.row.original.assigned_on), 'PPpp')}
              </span>
            </div>
          )
        }
      },
      {
        accessorKey: 'score, passed, status',
        header: 'Score',
        size: 80,
        cell: (info) => {
          const hasScore = info.row.original.score ?? '-'
          const pass = info.row.original.passed ? (
            <span className="text-green-400">Pass</span>
          ) : (
            <>{info.row.original.status !== "started" ? <span className="text-red-600">Did Not Pass</span> : ""} </>
          )
          if (info.row.original.status === "started") {
            return <span>-</span>
          }
          return (
            <div className='flex gap-2'>
              <b>
                {info.row.original.status !== "untaken" ? <>{hasScore}% - {pass}</> : "-"} </b>
            </div>
          )
        }
      },
      {
        accessorKey: 'id, status',
        header: 'Actions',
        size: 50,
        cell: (info) =>
          <div className='flex text-base gap-2'>
            {info.row.original.status !== "untaken" && (
              <Tooltip content="View results">
                <button
                  data-tooltip-target="tooltip-dark"
                  type="button"
                  className='px-1'
                  onClick={() => navigate(`/organization/${organization}/roster/${rosterId}/test/${info.row.original.id}`)}
                >
                  <HiEye />
                </button>
              </Tooltip>
            )}
          </div>
      },
    ]
    , [navigate, organization, rosterId]);

  const columnsCourses = useMemo<ColumnDef<CourseItem>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'status, ended_at',
        header: 'Status',
        size: 120,
        cell: (info) => {
          let itemStatus;
          switch (info.row.original.status) {
            case "finished":
              itemStatus = <b>Complete - </b>;
              break
            case "started":
              itemStatus = <span className=" font-bold text-blue-400">In Progress - </span>;
              break
            case "untaken":
              itemStatus = <span className=" font-bold text-red-500">Invite Sent - </span>;
              break
            default:
              itemStatus = "Unknown Status";
              break
          }
          return (
            <div className='flex gap-2'>
              <span>
                {itemStatus}
                {format(new Date(info.row.original.assigned_on), 'PPpp')}
              </span>
            </div>
          )
        }
      },
      {
        accessorKey: 'score, passed, status',
        header: 'Score',
        size: 80,
        cell: (info) => {
          const hasScore = info.row.original.score ?? '-'
          const pass = info.row.original.passed ? (
            <span className="text-green-400">Pass</span>
          ) : (
            <>{info.row.original.status !== "started" ? <span className="text-red-600">Did Not Pass</span> : ""} </>
          )
          if (info.row.original.status === "started") {
            return <span>-</span>
          }
          return (
            <div className='flex gap-2'>
              <b>
                {info.row.original.status !== "untaken" ? <>{hasScore}% - {pass}</> : "-"} </b>
            </div>
          )
        }
      },
      {
        accessorKey: 'id, status',
        header: 'Actions',
        size: 50,
        cell: (info) =>
          <div className='flex text-base gap-2'>
            {info.row.original.status !== "untaken" && (
              <Tooltip content="View results">
                <button
                  data-tooltip-target="tooltip-dark"
                  type="button"
                  className='px-1'
                  onClick={() => navigate(`/organization/${organization}/roster/${rosterId}/course/${info.row.original.id}`)}
                >
                  <HiEye />
                </button>
              </Tooltip>
            )}
            <Tooltip content="Delete">
              <button
                type="button"
                className='px-1'
                onClick={() => handleDelete({ user_id: rosterId, course_id: info.row.original.id })}
              >
                <FaTrash />
              </button>
            </Tooltip>
          </div>
      },
    ]
    , [navigate, organization, rosterId]);

  const columnsChecklist = useMemo<ColumnDef<ChecklistItem>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: (info) => {
          let itemStatus;
          switch (info.row.original.status) {
            case "finished":
              itemStatus = <b>Complete - </b>;
              break
            case "started":
              itemStatus = <span className=" font-bold text-blue-400">In Progress - </span>;
              break
            case "untaken":
              itemStatus = <span className=" font-bold text-red-500">Invite Sent - </span>;
              break
            default:
              itemStatus = "Unknown Status";
              break
          }
          return (
            <div className='flex gap-2'>
              <span>
                {itemStatus}
                {format(new Date(info.row.original.assigned_on), 'PPpp')}
              </span>
            </div>
          )
        }
      },
      {
        accessorKey: 'score',
        header: 'Score',
        size: 80,
        cell: (info) => <span>{info.row.original.score ? info.row.original.score : "-"}</span>
      },
      {
        accessorKey: 'id, status',
        header: 'Actions',
        size: 50,
        cell: (info) =>
          <div className='flex text-base gap-2'>
            {info.row.original.status !== "untaken" && (
              <Tooltip content="View results">
                <button
                  data-tooltip-target="tooltip-dark"
                  type="button"
                  className='px-1'
                  onClick={() => navigate(`/organization/${organization}/roster/${rosterId}/checklist/${info.row.original.id}`)}
                >
                  <HiEye />
                </button>
              </Tooltip>
            )}
            <Tooltip content="Delete">
              <button
                type="button"
                className='px-1'
                onClick={() => handleDelete({ user_id: rosterId, course_id: info.row.original.id })}
              >
                <FaTrash />
              </button>
            </Tooltip>
          </div>
      },
    ]
    , [navigate, organization, rosterId]);

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white w-20"
            type="button"
            onClick={() => navigate(`/organization/${organization}/roster`)}
          >
            Back
          </button>
        </div>
        <div><h1 className="text-base text-gray-700">{rosterInfo?.first_name} {rosterInfo?.last_name}</h1></div>
        <div>
          <button onClick={() => navigate(`/organization/${organization}/roster/${rosterId}/invite`)} type="button" className="bg-red-400 hover:border-red-600 text-white w-auto">Create new invite</button>
        </div>
      </div>
      <div className="overflow-y-auto h-full pb-10">
        <ModalConfirmation confirmDelete={confirmDelete} onClose={closeModal} isOpen={isModalOpen} />
        <div className="max-w-6xl mx-auto pt-14">
          {rosterIsLoading
            ? <Spinner
              aria-label="Extra small spinner example"
              size="xs"
            />
            : <div className=" flex start-0 mb-10 justify-between align-middle">
              <Avatar rounded size="lg" bordered>
                <h3>{rosterInfo?.first_name} {rosterInfo?.last_name}</h3>
              </Avatar>
              <div>
                {valueLoggeedIn > valueUserInfo && (
                  <button
                    type="button"
                    className="bg-white text-red-400 hover:border-red-400"
                    onClick={() => navigate(`/organization/${organization}/roster/${rosterId}/edit`)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>}

          <div className="flex justify-between mb-4">
            <h2 className=" text-2xl text-gray-700">Tests ({dataTest?.length})</h2>
          </div>
          <div className="mb-8">
            <Table data={dataTest || []} columns={columns} isLoading={testLoading} />
          </div>
          <div className="flex justify-between mb-4">
            <h2 className=" text-2xl text-gray-700">Skills Checklists ({dataChecklist?.length})</h2>
          </div>
          <div className="mb-8">
            <Table data={dataChecklist || []} columns={columnsChecklist} isLoading={checklistLoading} />
          </div>
          <div className="flex justify-between mb-4">
            <h2 className=" text-2xl text-gray-700">Mandatories ({dataCourses?.length})</h2>
          </div>
          <div className="pb-8">
            <Table data={dataCourses || []} columns={columnsCourses} isLoading={coursesLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RosterDetails;