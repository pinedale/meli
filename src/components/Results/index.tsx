import { useSearchParams } from "react-router-dom";
import BoxItem from "../BoxItem";
import { useSearchRequest } from "../../hooks/useSearchRequest";

const Results = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("search");
  const { data } = useSearchRequest(query || '')

  return (
    <div className="bg-primary-gray py-4">
      <div className="max-w-default mx-auto mb-4">
        <p className="text-slate-700">Electronica, Audio y Video</p>
      </div>
      <div className="bg-white p-4 w-4/5 mx-auto max-w-default">
        {data?.map((item) => <BoxItem key={item.id} item={item} />)}
      </div>
    </div>
  )
}

export default Results;