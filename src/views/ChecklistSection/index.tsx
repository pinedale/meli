import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import TableSection from "./components/table-section";
import { useFetch } from "../../contexts/fetchProvider";
import { useState } from "react";
import { CategoryAttr, useAddChecklistSection } from "./services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { Button } from "flowbite-react";

const schema = yup.object({
  title: yup.string().required("Required field"),
})

const ChecklistSection: React.FC = () => {
  const navigate = useNavigate();
  const { organization } = useFetch();
  const { checklistId, categoryId } = useParams();
  const queryClient = useQueryClient();
  const [addItem, setAddItem] = useState<boolean>(false);

  const handleClose = () => {
    navigate(`/organization/${organization}/checklist/${checklistId}`);
  }

  const toggleAddItem = () => {
    setAddItem(!addItem)
  }

  const { mutate } = useAddChecklistSection(checklistId ?? '', categoryId ?? '', {
    onError: (error) => {
      toast.error(error.response?.data?.error?.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['checklist-sections'])
      toast.success('Successfully added!');
      reset();
      setAddItem(!addItem);
    }
  })

  const { register, handleSubmit, reset } = useForm<CategoryAttr>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values) => {
    mutate(values)
  });

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className="text-base text-gray-700">Care Settings</h1></div>
        <div>
          <button className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Category Details</h2>
          <Button
            className=" border-red-500 hover:border-red-500 text-red-app focus:outline-none focus:shadow-none focus:ring-0"
            size="sm"
            color="light"
            type="button"
            onClick={toggleAddItem}
          >
            + Add New Section
          </Button>
        </div>
        {
          addItem && (
            <div className="border-2 p-1 rounded-lg mt-1 mb-7">
              <form onSubmit={onSubmit}>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter Section Title"
                    className="w-full px-2 py-2 border-gray-200 text-xs rounded"
                    {...register('title', { required: 'Required field' })}
                  />
                  <div className="flex gap-2 px-1">
                    <button type="button" onClick={toggleAddItem} className="bg-white text-red-400 hover:border-red-400">Cancel</button>
                    <button type="submit" className="bg-white text-red-400 hover:border-red-400">Save</button>
                  </div>
                </div>
              </form>
            </div>
          )
        }
        <TableSection />
      </div>
    </div>
  )
}

export default ChecklistSection;