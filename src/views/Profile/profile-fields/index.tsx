import { useState } from "react";
import useProfile from "./service";

type ProfileFieldsProps = {
  onClose: () => void;
}

const ProfileFields: React.FC<ProfileFieldsProps> = ({ onClose }) => {

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data } = useProfile()
  console.log("🚀 ~ file: index.tsx:10 ~ datassss:", data)

  const editProfile = () => {
    debugger;
    setIsEditing(true)
  }

  return (
    <>
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={onClose} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div>
          <h1 className=" text-base text-gray-700">Account Details</h1>
        </div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl text-gray-700">Course Details</h2>
          <div className="flex gap-3">
            <button>Change Password</button>
            <button type="button" onClick={editProfile} className="bg-red-400 hover:border-red-600 text-white">Edit Account</button>
          </div>
        </div>
        <div className=" w-full grid gap-4 grid-cols-3">
          <div>
            <label className="text-gray-700 text-xs mb-1 block">First Name</label>
            {isEditing
              ? <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter first name" />
              : <span className="text-gray-900 font-semibold text-xs">{data?.first_name}</span>}
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Last Name</label>
            <span className="text-gray-900 font-semibold text-xs">{data?.last_name}</span>
            <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter first name" />
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Email</label>
            <span className="text-gray-900 font-semibold text-xs">{data?.email}</span>
            <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter kind of test" />
          </div>
          <div>
            <label className="text-gray-700 text-xs mb-1 block">Phone Number</label>
            <span className="text-gray-900 font-semibold text-xs">{data?.phone_number}</span>
            <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter kind of test" />
          </div>
          
        </div>

      </div>
    </>
  )
}

export default ProfileFields;