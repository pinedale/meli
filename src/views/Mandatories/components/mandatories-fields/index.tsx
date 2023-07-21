import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { MandatoryAttr, useCreateMandatory } from "./services";
import { useForm } from "react-hook-form";

type MandatoriesFieldsProps = {
  onClose?: () => void;
}

const schema = yup.object({
  title: yup.string().required("Required field"),
  passing_score: yup.string().required("Required field"),
  desc: yup.string().required("Required field"),
  kind: yup.string().required("Required field"),
})

const MandatoriesFields: React.FC<MandatoriesFieldsProps> = ({ onClose }) => {
  const { register, handleSubmit } = useForm<MandatoryAttr>({
    defaultValues: {
      title: "",
      passing_score: "",
      desc: "",
      kind: "",
    },
    resolver: yupResolver<yup.AnyObject>(schema),
  });

  const { mutate } = useCreateMandatory({
    onError: (error) =>{
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The course has been created successfully");
    }
  })

  const onSubmit = handleSubmit((values) => {
    mutate(values);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button onClick={onClose} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div><h1 className=" text-base text-gray-700">Add New Course</h1></div>
          <div>
            <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
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