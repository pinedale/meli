import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { ChecklistFormAttr, useCreateChecklist } from "./services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "flowbite-react";
import { useState } from "react";
import { Block, ColorResult } from "@uiw/react-color";

const schema = yup.object({
  title: yup.string().required("Required field"),
  desc: yup.string().required("Required field"),
  color: yup.string().required("Required field"),
  kind: yup.string().required("Required field"),
  status: yup.string().optional(),
})

const ChecklistNew = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState("#f47373");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
    setShowColorPicker(false);
  };

  const { register, handleSubmit, control } = useForm<ChecklistFormAttr>({
    defaultValues: {
      title: "",
      desc: "",
      color: "",
      kind: "",
      status: "",
    },
    resolver: yupResolver(schema),
  });

  const { mutate } = useCreateChecklist({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The Checklist has been created successfully");
      navigate(-1);
    }
  })

  const onSubmit = handleSubmit((values) => {
    const statusValue = values.status === "true" ? "active" : "inactive";
    const newValues = { ...values, status: statusValue }
    mutate(newValues);
  });
  return (
    <form onSubmit={onSubmit}>
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button type="button" onClick={() => navigate(-1)} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className=" text-base text-gray-700">Add New Skills Checklist</h1></div>
        <div className="flex flex-row gap-2">
          <div className="flex gap-2 flex-row items-center"><span>Active?</span> <Checkbox {...register('status')} /></div>
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
              placeholder="Enter title"
              {...register('title', { required: 'Title is required' })}
            />
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
    </form>
  )
}

export default ChecklistNew;