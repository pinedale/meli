import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { useGetUserTest, type TestItem, useGetUserChecklist, type ChecklistItem, useGetUserCourses, type CourseItem } from "./services";
import Table from "../../components/Table";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";

const RosterDetails: React.FC = () => {
  const { organization } = useFetch();
  const { rosterId } = useParams()
  const navigate = useNavigate();
  const { data: dataTest, isLoading: testLoading } = useGetUserTest(rosterId);
  const { data: dataChecklist, isLoading: checklistLoading } = useGetUserChecklist(rosterId);
  const { data: dataCourses, isLoading: coursesLoading } = useGetUserCourses(rosterId);

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
        cell: (info) =>
          <div className='flex gap-2'>
            <span>
              {info.row.original.status !== "untaken" ? info.row.original.status : <p><b className="text-red-600">Invite Sent</b> - {format(new Date(info.row.original.assigned_on), 'PPpp')}</p>}
              {info.row.original.ended_at ? `- ${format(new Date(info.row.original.ended_at), 'PPpp')}` : ''}
              {info.row.original.status == "started" ? `- ${format(new Date(info.row.original.started_at), 'PPpp')}` : ''}
            </span>
          </div>
      },
      {
        accessorKey: 'score, passed, status',
        header: 'Score',
        size: 220,
        cell: (info) => {
          const hasScore = info.row.original.score ?? '-'
          const pass = info.row.original.passed ? (
            <span className="text-green-400">Pass</span>
          ) : (
            <span className="text-red-600">Did Not Pass</span>
          )
          return (
            <div className='flex gap-2'>
              <b>
                {info.row.original.status !== "untaken" ? <>{hasScore}% - {pass}</> : "-"} </b>
            </div>
          )
        }
      }
    ]
    , []);

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
        cell: (info) =>
          <div className='flex gap-2'>
            <span>
              {info.row.original.status !== "untaken" ? info.row.original.status : <p><b className="text-red-600">Invite Sent</b> - {format(new Date(info.row.original.assigned_on), 'PPpp')}</p>}
              {info.row.original.ended_at ? `- ${format(new Date(info.row.original.ended_at), 'PPpp')}` : ''}
              {info.row.original.status == "started" ? `- ${format(new Date(info.row.original.started_at), 'PPpp')}` : ''}
            </span>
          </div>
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
            <span className="text-red-600">Did Not Pass</span>
          )
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
        size: 100,
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
        cell: (info) =>
          <div className='flex gap-2'>
            <span>
              {info.row.original.status !== "untaken"
                ? info.row.original.status
                : <p><b className="text-red-600">Invite Sent</b> - {format(new Date(info.row.original.assigned_on), 'PPpp')}</p>}
              {info.row.original.ended_at ? `- ${format(new Date(info.row.original.ended_at), 'PPpp')}` : ''}
              {info.row.original.status == "started" ? `- ${format(new Date(info.row.original.started_at), 'PPpp')}` : ''}
            </span>
          </div>
      }
    ]
    , []);

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
        <div><h1 className="text-base text-gray-700">Roster Details</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="overflow-y-auto h-full pb-10">
        <div className="max-w-6xl mx-auto pt-14">
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