import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Block, ColorResult } from "@uiw/react-color";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TestAttr, useCreateTest } from "./services";
import { useState } from "react";
import { toast } from "react-toastify";
import { Checkbox } from "flowbite-react";
import { durationDaysOptions, passingScoreOptions } from "../../utils/constants";

const schema = yup.object({
  title: yup.string().required("Required field"),
  passing_score: yup.string().required("Required field"),
  desc: yup.string().optional(),
  kind: yup.string().optional(),
  color: yup.string().required("Required field"),
  duration_mins: yup.string().required("Required field"),
  status: yup.string().required("Required field"),
})

const TestNew = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState("#f47373");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<TestAttr>({
    defaultValues: {
      title: "",
      passing_score: "",
      duration_mins: "",
      desc: "",
      color: "f47373",
      status: "",
      kind: "",
    },
    resolver: yupResolver<TestAttr>(schema),
  });

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
    setShowColorPicker(false);
  };

  const { mutate } = useCreateTest({
    onError: (error) => {
      toast.error(`${error.response?.data?.error?.details[0]}`);
    },
    onSuccess: () => {
      toast.success("The test has been created successfully");
      navigate(-1);
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
        <div><h1 className=" text-base text-gray-700">Add New Test</h1></div>
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
            <label className="text-gray-700 text-xs mb-1 block">Duration</label>
            <select
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              {...register("duration_mins")}
            >
              <option>Select duration</option>
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
              <option>Select passing score</option>
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
              placeholder="Enter kind of test"
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
              {...register("desc")}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default TestNew;