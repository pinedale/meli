import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Block, ColorResult } from "@uiw/react-color";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TestAttr, useCreateTest } from "./services";
import { useState } from "react";
import { toast } from "react-toastify";
import { Checkbox } from "flowbite-react";

const schema = yup.object({
  title: yup.string().required("Required field"),
  passing_score: yup.string().required("Required field"),
  desc: yup.string().required("Required field"),
  color: yup.string().required("Required field"),
  duration_mins: yup.string(),
})

const TestNew = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState("#f47373");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { register, handleSubmit, control } = useForm<TestAttr>({
    defaultValues: {
      title: "",
      passing_score: "",
      duration_mins: "",
      desc: "",
      color: "f47373",
      status: "",
    },
    resolver: yupResolver<yup.AnyObject>(schema),
  });

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex); // Update the 'hex' state with the selected color
    setShowColorPicker(false);
  };

  const { mutate } = useCreateTest({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
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
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Duration</label>
            <select
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              {...register("duration_mins")}
            >
              <option value="1">0 days</option>
              <option value="2">1 days</option>
              <option value="3">3 days</option>
            </select>
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Passing Score</label>
            <select
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              {...register("passing_score")}
            >
              <option value="60">60%</option>
              <option value="61">61%</option>
              <option value="62">62%</option>
              <option value="63">63%</option>
              <option value="64">64%</option>
              <option value="65">65%</option>
              <option value="66">66%</option>
              <option value="66">66%</option>
              <option value="67">67%</option>
              <option value="68">68%</option>
              <option value="69">69%</option>
              <option value="70">70%</option>
              <option value="71">71%</option>
              <option value="72">72%</option>
              <option value="73">73%</option>
              <option value="74">74%</option>
              <option value="75">75%</option>
              <option value="75">75%</option>
              <option value="76">76%</option>
              <option value="77">77%</option>
              <option value="78">78%</option>
              <option value="79">79%</option>
              <option value="80">80%</option>
              <option value="81">81%</option>
              <option value="82">82%</option>
              <option value="83">83%</option>
              <option value="84">84%</option>
              <option value="85">85%</option>
              <option value="86">86%</option>
              <option value="87">87%</option>
              <option value="89">89%</option>
              <option value="90">90%</option>
              <option value="91">91%</option>
              <option value="92">92%</option>
              <option value="93">93%</option>
              <option value="94">94%</option>
              <option value="95">95%</option>
              <option value="96">96%</option>
              <option value="97">97%</option>
              <option value="98">98%</option>
              <option value="99">99%</option>
              <option value="100">100%</option>
            </select>
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