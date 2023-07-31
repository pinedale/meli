import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { type TestAttr, useGetTest } from "./services";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Block, ColorResult } from "@uiw/react-color";

const schema = yup.object({
  title: yup.string().required("Required field"),
  passing_score: yup.string().required("Required field"),
  desc: yup.string().required("Required field"),
  color: yup.string().required("Required field"),
  duration_mins: yup.string(),
})

const TestFields = () => {
  const { testId } = useParams()
  const { data } = useGetTest(testId);
  const [color, setColor] = useState("#f47373");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { register, reset, control } = useForm<TestAttr>({
    defaultValues: {
      title: data?.title,
      passing_score: data?.passing_score,
      duration_mins: data?.duration_mins,
      desc: data?.desc,
      color: data?.color,
      status: data?.status
    },
    resolver: yupResolver<yup.AnyObject>(schema),
  });

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex); 
    setShowColorPicker(false);
  };

  useEffect(() => {
    reset(data)
  }, [data, reset]);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className=" text-2xl text-gray-700 mb-8">UNA test Details</h2>
      <div className=" w-full grid gap-4 grid-cols-3">
        <div>
          <label className="text-gray-700 text-xs mb-1 block">Title</label>
          <input
            className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
            type="text"
            placeholder="Enter first name"
            {...register('title', { required: 'Title is required' })}
          />
        </div>
        <div>
          <label className="text-gray-700 text-xs mb-1 block">Duration</label>
          <select
            className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
            {...register("duration_mins")}
          >
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
            <option value="other1">4 Days</option>
            <option value="other2">5 Days</option>
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
            placeholder="Enter kind of test"
            {...register('kind')}
          />
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
  )
}

export default TestFields;