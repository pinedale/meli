import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { RosterFormAttr, useCreateRoster } from "./services";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  first_name: yup.string().required("Required field"),
  last_name: yup.string().required("Required field"),
  email: yup.string().required("Required field"),
  phone_number: yup.string().optional(),
  bio: yup.string().optional(),
  attachment: yup.string().optional(),
  role: yup.string().required("Required field"),
})

const RosterNew = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<RosterFormAttr>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      role: "",
      attachment: "",
      bio: "",
    },
    resolver: yupResolver(schema),
  });


  const { mutate } = useCreateRoster({
    onSuccess: () => {
      toast.success("The member has been created successfully");
      navigate(-1)
      queryClient.invalidateQueries(['users'])
    }
  })

  const onSubmit = handleSubmit((values) => {
    mutate({ user: values });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={() => navigate(-1)} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className=" text-base text-gray-700">Add new User</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <h2 className=" text-2xl text-gray-700 mb-8">User Details</h2>
        <div className=" w-full grid gap-4 grid-cols-3">
          <div className="col-span-1">
            <label className="relative flex items-center cursor-pointer">
              <div className="mr-3">
                <div className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">UNA</span>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden absolute"
                />
                <div className="line-flex items-center justify-center w-24 h-24 overflow-hidden rounded-full absolute top-0">
                  {/* <img src={file} className="w-full h-full object-cover" /> */}
                </div>
              </div>
              <span className="text-red-app">+ Add Photo</span>
            </label>
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Role</label>
            <select
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              {...register("role")}
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter / QA</option>
              <option value="professional">Healthcara Professional</option>
            </select>
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">First Name</label>
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="Enter first name"
              {...register('first_name', { required: 'required' })}
            />
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Last Name</label>
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="Enter last name"
              {...register('last_name', { required: 'required' })}
            />
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Email</label>
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="Enter email"
              {...register('email', { required: 'required' })}
            />
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Phone</label>
            <input
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              type="text"
              placeholder="Enter phone number"
              {...register('phone_number', { required: 'required' })}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default RosterNew;