import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import TestFields from "./components/test-fields";
import Table from "../../components/Table";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryItem, useGetTestCategories } from "./services";

const TestDetails: React.FC = () => {
  const { organization } = useFetch();
  const { testId } = useParams()
  const navigate = useNavigate();
  const { data, isFetching } = useGetTestCategories(testId);

  const colums = useMemo<ColumnDef<CategoryItem>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'questions',
        header: 'Questions',
        size: 120,
        cell: (info) =>
          <div>
            {info.row.original.questions.length}
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
            onClick={() => navigate(`/organization/${organization}/test`)}
          >
            Cancel
          </button>
        </div>
        <div><h1 className="text-base text-gray-700">Test Details</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="overflow-y-auto h-full pb-10">
        <div className="max-w-6xl mx-auto pt-14">
          <div className=" mb-10">
            <TestFields />
          </div>
          <Table data={data || []} isLoading={isFetching} columns={colums}/>
        </div>
      </div>
    </div>
  )
}

export default TestDetails;