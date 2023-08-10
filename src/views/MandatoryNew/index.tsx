import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Checkbox } from "flowbite-react";
import { MandatoryAttr, useCreateMandatory } from "./services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";
import { passingScoreOptions } from "../../utils/constants";

const schema = yup.object({
  title: yup.string().required("Required field"),
  passing_score: yup.string().required("Required field"),
  desc: yup.string().optional(),
  kind: yup.string().optional(),
  color: yup.string().optional(),
  duration_mins: yup.string().optional(),
  status: yup.string().required("Required field"),
})

const MandatoryNew = () => {
  const navigate = useNavigate();
  const { organization } = useFetch();
  const { register, handleSubmit, formState: { errors } } = useForm<MandatoryAttr>({
    defaultValues: {
      title: "",
      passing_score: "",
      desc: "",
      kind: "",
      status: "",
    },
    resolver: yupResolver<MandatoryAttr>(schema),
  });

  const { mutate } = useCreateMandatory({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The course has been created successfully");
      navigate(`/organization/${organization}/mandatories`);
    }
  })

  const onSubmit = handleSubmit((values) => {
    const statusValue = values.status ? values.status = "active" : "inactive";
    const newValues = { ...values, status: statusValue }
    mutate(newValues);
  });
  return (
    <form onSubmit={onSubmit}>
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button type="button" onClick={() => navigate(-1)} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className=" text-base text-gray-700">Add New Course</h1></div>
        <div className="flex flex-row gap-2">
          <div className="flex gap-2 flex-row items-center"><span>Active?</span> <Checkbox  {...register('status')} /></div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <h2 className=" text-2xl text-gray-700 mb-8">Create New Course</h2>
        <div className="w-full grid gap-4 grid-cols-3">
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Title</label>
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="title"
              {...register('title', { required: 'Title is required' })}
            />
            <p className="text-xs text-red-app">{errors.title?.message}</p>
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Passing Score</label>
            <select
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              {...register("passing_score")}
            >
              {passingScoreOptions.map((option) => (
                <option key={option} value={option}>
                  {option}%
                </option>
              ))}
            </select>
            <p className="text-xs text-red-app">{errors.passing_score?.message}</p>
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Course Artwork</label>
            <input
              className="block w-full mb-5 bg-gray-100 border-2 rounded px-3 py-1 text-xs text-gray-700 cursor-pointer focus:outline-none"
              id="small_size" type="file"
            />
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Kind</label>
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="Enter kind of test"
              {...register("kind")}
            />
          </div>
          <div className="col-span-3">
            <label className="text-gray-700 text-xs mb-1 block">Description</label>
            <textarea
              rows={5}
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              placeholder="Enter description for test..."
              {...register("desc")}
            />
          </div>
        </div>

      </div>
    </form>
  )
}

export default MandatoryNew;