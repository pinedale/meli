import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { useGetUserTest, type TestItem, useGetUserChecklist, type ChecklistItem, useGetUserCourses,  type CourseItem } from "./services";
import Table from "../../components/Table";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

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
        accessorKey: 'status',
        header: 'Status',
        size: 120,
      },
      {
        accessorKey: 'score',
        header: 'Score',
        size: 220,
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
        accessorKey: 'status',
        header: 'Status',
        size: 120,
      },
      {
        accessorKey: 'score',
        header: 'Score',
        size: 220,
      }
    ]
    , []);

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
            Cancel
          </button>
        </div>
        <div><h1 className="text-base text-gray-700">Edit Skills Checklist</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14 overflow-y-auto h-full">
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
        <div>
          <Table data={dataCourses || []} columns={columnsCourses} isLoading={coursesLoading} />
        </div>
      </div>
    </div>
  )
}

export default RosterDetails;