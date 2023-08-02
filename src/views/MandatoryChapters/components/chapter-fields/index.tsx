import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ChapterAttr, useUpdateMandatoryChapter } from "./services";
import { useFetch } from "../../../../contexts/fetchProvider";

const schema = yup.object({
  content: yup.string().required("Required field"),
})

type ChapterFormAttr = {
  content: string;
}

type ChapterFieldsProps = {
  data: ChapterAttr | undefined;
}

const ChapterFields: React.FC<ChapterFieldsProps> = ({ data }) => {
  const { organization } = useFetch();
  console.log("🚀 ~ file: index.tsx:12 ~ data:", data)
  const { mandatoryId, chapterId } = useParams()
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/organization/${organization}/mandatories/${mandatoryId}`);
  }

  const { register, reset, handleSubmit } = useForm<ChapterFormAttr>({
    defaultValues: {
      content: data?.content,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(data)
  }, [data, reset]);

  const { mutate } = useUpdateMandatoryChapter({
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("The chapter has been updated successfully");
      navigate(`/organization/${organization}/mandatories/${mandatoryId}`);
    }
  })

  const onSubmit = handleSubmit((values) => {
    const payload = {
      id: mandatoryId,
      chapterId: chapterId,
      data: values,
    };
    mutate(payload);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button type="button" onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className="text-base text-gray-700">{data?.title}</h1></div>
        <div>
          <button type="submit" className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Chapter Details</h2>
        </div>
        <div className="w-full grid gap-4 mb-10">
          <div className="col-span-3">
            <label className="text-gray-700 text-xs mb-1 block">Description</label>
            <textarea
              rows={5}
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              placeholder="Enter description for test..."
              {...register("content")}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default ChapterFields;