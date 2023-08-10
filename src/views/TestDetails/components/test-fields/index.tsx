import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTest, useUpdateTest, type TestFormAttr } from "./services";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Block, ColorResult } from "@uiw/react-color";
import { Checkbox } from "flowbite-react";
import { toast } from "react-toastify";
import { useFetch } from "../../../../contexts/fetchProvider";
import { BeatLoader } from "react-spinners";
import { durationDaysOptions, passingScoreOptions } from "../../../../utils/constants";

const schema = yup.object({
  title: yup.string().required("Required field"),
  passing_score: yup.string().required("Required field"),
  desc: yup.string().optional(),
  kind: yup.string().optional(),
  color: yup.string().required("Required field"),
  duration_mins: yup.string().required("Required field"),
  status: yup.string().required("Required field"),
})

const TestFields = () => {
  const { organization } = useFetch();
  const { testId } = useParams();
  const { data, isLoading } = useGetTest(testId);
  const navigate = useNavigate();
  const [color, setColor] = useState("#f47373");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { register, reset, control, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<TestFormAttr>({
    defaultValues: {
      title: data?.title,
      passing_score: data?.passing_score,
      duration_mins: data?.duration_mins,
      desc: data?.desc,
      color: data?.color,
      status: data?.status == "active" ? data?.status : "",
      kind: data?.kind !== null ? data?.kind : "",
    },
    resolver: yupResolver<TestFormAttr>(schema),
  });

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
    setShowColorPicker(false);
    setValue("color", color.hex);
  };

  useEffect(() => {
    reset(data)
  }, [data, reset]);

  const { mutate: updateTest } = useUpdateTest({
    onSuccess: () => {
      toast.success("The test has been updated successfully");
      navigate(`/organization/${organization}/test`)
    },
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
  })

  const onSubmit = handleSubmit((values) => {
    const statusString = values.status === "active" ? values.status = "active" : "inactive";
    const payload = {
      id: testId,
      data: { ...values, status: statusString },
    };
    updateTest(payload);
  });

  useEffect(() => {
    setValue("status", data?.status === "active" ? "true" : "")
  }, [data?.status, getValues, setValue, watch])

  useEffect(() => {
    setValue("color", data?.color ? data?.color : "")
    setColor(data?.color || "");
  }, [data?.color, setValue])

  if (isLoading) return <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>

  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button type="button" onClick={() => navigate(`/organization/${organization}/test`)} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className="text-base text-gray-700">Edit Course {`${data?.kind}`}</h1></div>
        <div className="flex flex-row gap-2">
          <div className="flex gap-2 flex-row items-center"><span>Active?</span> <Checkbox value="active" {...register('status')} /></div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <h2 className=" text-2xl text-gray-700 mb-8">Test Details</h2>
        <div className=" w-full grid gap-4 grid-cols-3">
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Title</label>
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="Enter first name"
              {...register('title', { required: 'Title is required' })}
            />
            <p className="text-xs text-red-app">{errors.title?.message}</p>
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Duration</label>
            <select
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              {...register("duration_mins")}
            >
              {durationDaysOptions.map((option) => (
                <option key={option} value={option}>
                  {option} {option == "1" ? "day" : "days"}
                </option>
              ))}
            </select>
            <p className="text-xs text-red-app">{errors.duration_mins?.message}</p>
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
          <div className="relative">
            <label className="text-gray-700 text-xs mb-1 block">Color</label>
            {showColorPicker && (
              <div className="absolute bottom-9">
                <Controller
                  name="color"
                  control={control}
                  render={({ field: { value } }) => (
                    <Block color={value} onChange={handleColorChange} />
                  )}
                />
              </div>

            )}
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="Enter color"
              value={color}
              onClick={() => setShowColorPicker(true)}
              {...register("color")}
            />
            <div style={{ backgroundColor: color }} className="w-4 h-4 absolute right-3 top-7 rounded"></div>
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Kind</label>
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="kind"
              {...register('kind')}
            />
            <p className="text-xs text-red-app">{errors.kind?.message}</p>
          </div>
          <div className="col-span-3">
            <label className="text-gray-700 text-xs mb-1 block">Description</label>
            <textarea
              rows={5}
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              placeholder="Enter description for test..."
              {...register('desc')}
            />
          </div>
        </div>

      </div>
    </form>
  )
}

export default TestFields;