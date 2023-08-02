import { useNavigate, useParams } from "react-router-dom";
import { type Question, useGetTestCategoryDetails } from "./services";
import { useFetch } from "../../contexts/fetchProvider";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import Table from "../../components/Table";

const TestCategoryDetails = () => {
  const { organization } = useFetch();
  const navigate = useNavigate();
  const { testId, categoryId } = useParams();
  const { data, isLoading } = useGetTestCategoryDetails(testId, categoryId);

  const colums = useMemo<ColumnDef<Question>[]>(() =>
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
            {info.row.original.answers.length}
          </div>
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 80,
        cell: (info) =>
				<div className='flex text-base gap-2'>
					<Tooltip content="View category details">
						<button
							onClick={() => navigate(`/organization/${organization}/test/${testId}/category/${categoryId}/question/${info.row.original.id}`)}
							data-tooltip-target="tooltip-dark"
							type="button" className='px-1'
						>
							<HiEye />
						</button>
					</Tooltip>
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
    , [navigate, organization, testId]);

  return(
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={() => navigate(`/organization/${organization}/test/${testId}`)} type="button" className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className="text-base text-gray-700">{data?.title}</h1></div>
        <div>
          
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Questions ({data?.questions?.length})</h2>
          <button onClick={() => navigate(`/organization/${organization}/test/${testId}/category/${categoryId}/question/new`)} type="button" className="bg-white text-red-400 hover:border-red-400">+ Add Question</button>
        </div>
        <Table data={data?.questions || []} columns={colums} isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default TestCategoryDetails;