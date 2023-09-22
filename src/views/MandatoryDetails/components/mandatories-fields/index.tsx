import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { MandatoryAttr, useGetMandatory, useUpdateMandatory } from "./services";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useFetch } from "../../../../contexts/fetchProvider";
import { toast } from "react-toastify";
import { Checkbox } from "flowbite-react";
import { passingScoreOptions } from "../../../../utils/constants";

const schema = yup.object({
  title: yup.string().required("Required field"),
  passing_score: yup.string().required("Required field"),
  desc: yup.string().optional(),
  kind: yup.string().optional(),
  status: yup.string().optional(),
})


const MandatoriesFields = () => {
  const { organization } = useFetch();
  const navigate = useNavigate();
  const { mandatoryId } = useParams()
  const { data } = useGetMandatory(mandatoryId ?? "");

  const { register, reset, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<MandatoryAttr>({
    defaultValues: {
      title: data?.title,
      passing_score: data?.passing_score,
      desc: data?.desc,
      kind: data?.kind,
      status: data?.status == "active" ? data?.status : "inactive",
    },
    resolver: yupResolver<MandatoryAttr>(schema),
  });

  useEffect(() => {
    reset(data)
  }, [data, reset]);

  const { mutate } = useUpdateMandatory({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The course has been updated successfully");
      navigate(`/organization/${organization}/mandatories`);
    }
  })

  const onSubmit = handleSubmit((values) => {
    const statusString = values.status === "active" ? values.status = "active" : "inactive";
    const payload = {
      id: mandatoryId,
      data: { ...values, status: statusString },
    };
    mutate(payload);
  });

  useEffect(() => {
    setValue("status", data?.status === "active" ? "active" : "")
  }, [data?.status, getValues, setValue, watch])

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button type="button" onClick={() => navigate(`/organization/${organization}/mandatories`)} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div><h1 className="text-base text-gray-700">Edit Course</h1></div>
          <div className="flex flex-row gap-2">
            <div className="flex gap-2 flex-row items-center"><span>Active?</span> <Checkbox value="active" {...register('status')} /></div>
            <button type="submit" className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-14">
          <h2 className=" text-2xl text-gray-700 mb-8">Course Details</h2>
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
    </>
  )
}

export default MandatoriesFields;