type RostertFieldsProps = {
    onClose: () => void;
  }
  const RostertFields: React.FC<RostertFieldsProps> = ({onClose}) => {
  
    return (
      <>
        <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button onClick={onClose} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div><h1 className=" text-base text-gray-700">Add new User</h1></div>
          <div>
            <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-14">
          <h2 className=" text-2xl text-gray-700 mb-8">User Details</h2>
          <div className=" w-full grid gap-4 grid-cols-3">
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Role</label>
              <select className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700">
                <option value="female">Corporate</option>
                <option value="male">Super Admin</option>
                <option value="other">Admin</option>
                <option value="other1">Recluiter / QA</option>
                <option value="other2">Healthcara Professional</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">First Name</label>
              <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter first name" />
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Last Name</label>
              <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter last name" />
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Email</label>
              <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter email" />
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Phone</label>
              <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter phone number" />
            </div>
          </div>
  
        </div>
      </>
    )
  }
  
  export default RostertFields;