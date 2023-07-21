import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { ChapterAttr, Question, useGetMandatoryChapterDetails } from "./services";
import Table from "../../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const MandatoryChapters: React.FC = () => {
  const { organization } = useFetch();
  const { mandatoryId, chapterId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetMandatoryChapterDetails(mandatoryId, chapterId);
  console.log("🚀 ~ file: index.tsx:13 ~ dataaaaa:", data)
  const handleClose = () => {
    navigate(`/organization/${organization}/mandatories/${mandatoryId}`);
  }

  const { register } = useForm<ChapterAttr>({
    defaultValues: {
      content: data?.content,
    }
  })

  const columns = useMemo<ColumnDef<Question>[]>(() =>
    [
      {
        accessorKey: 'title',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'answers',
        header: 'Answer Options',
        size: 120,
        cell: (info) =>
          <div className='flex gap-2'>
            <span>
              {info.row.original.answers.length}
            </span>
          </div>
      }
    ]
    , []);

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className="text-base text-gray-700">{data?.title}</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Chapter Details</h2>
        </div>
        <div className="w-full grid gap-4 mb-10">
          <div className="col-span-3">
            <label className="text-gray-700 text-xs mb-1 block">Description</label>
            <textarea
              rows={5}
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              placeholder="Enter description for test..."
              {...register("content")}
            />
          </div>
        </div>
        <Table data={data?.questions || []} isLoading={isLoading} columns={columns}/>
      </div>
    </div>
  )
}

export default MandatoryChapters;