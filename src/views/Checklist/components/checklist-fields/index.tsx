// import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateChecklist, useGetChecklist } from "./service";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { type ChecklistFormAttr } from "./service";
import TableCategory from "../table-category";
// import TableDetails from "../table-details";

const schema = yup.object({
  title: yup.string().required("Required field"),
  desc: yup.string().required("Required field"),
  color: yup.string().required("Required field"),
  kind: yup.string().required("Required field"),
})

type ChecklistFieldsProps = {
  onClose: () => void;
  id?: number | null;
}

const ChecklistFields: React.FC<ChecklistFieldsProps> = ({ onClose, id }) => {

  const {data} = useGetChecklist(id);

  const { register, handleSubmit, reset } = useForm<ChecklistFormAttr>({
    defaultValues: {
      title: data?.title,
      desc: data?.desc,
      color: data?.color,
      kind: data?.color,
    },
    resolver: yupResolver(schema),
  });

  const { mutate } = useCreateChecklist({
    onError: (error) =>{
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The Checklist has been created successfully");
    }
  })

  useEffect(() => {
    reset(data)
  }, [data, reset]);

  const onSubmit = handleSubmit((values) => {
    mutate(values);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <ToastContainer />
        <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div><h1 className=" text-base text-gray-700">Add new Skills Checklist</h1></div>
          <div>
            <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-14">
          <h2 className=" text-2xl text-gray-700 mb-8">Checklist Details</h2>
          <div className=" w-full grid gap-4 grid-cols-3">
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Title</label>
              <input
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                type="text"
                placeholder="Enter title"
                {...register('title', { required: 'Title is required' })}
              />
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Color</label>
              <input
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                type="text"
                placeholder="Select color"
                {...register('color', { required: 'color is required' })}
              />
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Kind</label>
              <input
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                type="text"
                placeholder="Enter kind"
                {...register('kind', { required: 'Kind is required' })}
              />
            </div>
            <div className="col-span-3">
              <label className="text-gray-700 text-xs block mb-1">Description</label>
              <textarea
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                {...register('desc')}
              />
            </div>
          </div>

        </div>
        <div className="max-w-6xl mx-auto pt-14">
          <h2 className="text-2xl text-gray-700 mb-8">Categories ({data?.categories?.length})</h2>
          <TableCategory data={data?.categories} checklistId={id}/>
        </div>
      </form>
    </>
  )
}

export default ChecklistFields;