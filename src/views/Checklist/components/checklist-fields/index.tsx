// import { useForm } from "react-hook-form";

type ChecklistFieldsProps = {
  onClose: () => void;
}
const ChecklistFields: React.FC<ChecklistFieldsProps> = ({ onClose }) => {

  // const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
  //   defaultValues: {
  //     first_name: data?.first_name,
  //     last_name: data?.last_name,
  //     phone_number: data?.phone_number || "",
  //     email: data?.email,
  //   },
  //   resolver: yupResolver(schema),
  // });



  // const onSubmit = handleSubmit((values) => {
  //   console.log("🚀 ~ file: index.tsx:47 ~ onSubmit ~ values:", values)
  //   mutate(values)
  // });

  return (
    <>
      <form>
        <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button onClick={onClose} className=" bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div><h1 className=" text-base text-gray-700">Add new Skills Checklist</h1></div>
          <div>
            <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-14">
          <h2 className=" text-2xl text-gray-700 mb-8">Checkist Details</h2>
          <div className=" w-full grid gap-4 grid-cols-3">
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Title</label>
              <input
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                type="text"
                placeholder="Enter title" 
              />
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Color</label>
              <input
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                type="text"
                placeholder="Select color"
              />
            </div>
            <div>
              <label className="text-gray-700 text-xs mb-1 block">Kind</label>
              <input className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" type="text" placeholder="Enter kind" />
            </div>
            <div className="col-span-3">
              <label className="text-gray-700 text-xs block mb-1">Description</label>
              <textarea className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700" />
            </div>
          </div>

        </div>
      </form>
    </>
  )
}

export default ChecklistFields;