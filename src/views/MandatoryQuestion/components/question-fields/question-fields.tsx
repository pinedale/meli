
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { QuestionAttr } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../contexts/fetchProvider";

const schema = yup.object({
  title: yup.string().required("Required field"),
})

type QuestionFieldsProps = {
  data: QuestionAttr | undefined;
}

const QuestionFields: React.FC<QuestionFieldsProps> = ({ data }) => {
  const { organization } = useFetch();
  const navigate = useNavigate();
  const { mandatoryId, chapterId } = useParams()
  const handleClose = () => {
    navigate(`/organization/${organization}/mandatories/${mandatoryId}/chapters/${chapterId}`);
  }

  const { register, handleSubmit } = useForm<QuestionAttr>({
    defaultValues: {
      title: data?.title,
    },
    resolver: yupResolver<yup.AnyObject>(schema),
  });

  return(
    <form>
      <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
        <div>
          <button onClick={handleClose} type="button" className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
        </div>
        <div><h1 className="text-base text-gray-700">{data?.title}</h1></div>
        <div>
          <button type="submit" className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-14">
        <div className="flex justify-between mb-8">
          <h2 className=" text-2xl text-gray-700">Question Details</h2>
        </div>
        <div className="w-full grid gap-4 mb-10">
          <div className="col-span-3">
            <label className="text-gray-700 text-xs mb-1 block">Title</label>
            <input
              type="text"
              className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
              placeholder="Enter question title"
              {...register('title', { required: 'Title is required' })}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default QuestionFields;