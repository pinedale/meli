import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from "react-toastify";
import { useProfile, useUpdateProfile } from "./service";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  first_name: yup.string().required("Required field"),
  last_name: yup.string().required("Required field"),
  phone_number: yup.string().required("Required field"),
  email: yup.string().email("please enter a valid email").required("Required field"),
})

type ProfileForm = {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data } = useProfile()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    defaultValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      phone_number: data?.phone_number || "",
      email: data?.email,
    },
    resolver: yupResolver(schema),
  });

  const editProfile = () => {
    setIsEditing(true)
  }

  const { mutate } = useUpdateProfile({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("Profile has been updated");
      setIsEditing(false)
    }
  })

  useEffect(() => {
    reset(data)
  }, [data, reset]);

  const onSubmit = handleSubmit((values) => {
    mutate(values)
  });

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white z-50">
      <form onSubmit={onSubmit}>
        <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button type="button" onClick={() => navigate(-1)} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div>
            <h1 className=" text-base text-gray-700">Account Details</h1>
          </div>
          <div>
            {isEditing && <button type="submit" className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>}
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-14">
          <div className="flex justify-between mb-8">
            <h2 className="text-2xl text-gray-700">Account Details</h2>
            <div className="flex gap-3">
              <button type="button">Change Password</button>
              <button type="button" onClick={editProfile} className="bg-red-400 hover:border-red-600 text-white">Edit Account</button>
            </div>
          </div>
          <div className="w-full grid gap-4 grid-cols-3 mb-10">
            <div>
              <label className="text-gray-700 text-xs mb-1 block">First Name</label>
              {isEditing
                ? <input
                  className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                  type="text"
                  placeholder="Enter first name"
                  {...register('first_name', { required: 'Required field' })}
                />
                : <span className="text-gray-900 font-semibold text-xs">{data?.first_name}</span>}
              <p className="text-xs text-red-app">{errors.first_name?.message}</p>
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Last Name</label>
              {isEditing
                ? <input
                  className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                  type="text"
                  placeholder="Enter last name"
                  {...register('last_name', { required: 'Required field' })}
                />
                : <span className="text-gray-900 font-semibold text-xs">{data?.last_name}</span>}
              <p className="text-xs text-red-app">{errors.last_name?.message}</p>
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Email</label>
              {isEditing
                ? <input
                  className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                  type="text"
                  placeholder="Enter email"
                  {...register('email', { required: 'Required field' })}
                />
                : <span className="text-gray-900 font-semibold text-xs">{data?.email}</span>}
              <p className="text-xs text-red-app">{errors.email?.message}</p>
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Phone Number</label>
              {isEditing
                ? <input
                  className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                  type="phone"
                  placeholder="Enter phone number"
                  {...register('phone_number', { required: 'Required field' })}
                />
                : <span className="text-gray-900 font-semibold text-xs">{data?.phone_number ? data?.phone_number : "None provided"}</span>}
              <p className="text-xs text-red-app">{errors.phone_number?.message}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile;