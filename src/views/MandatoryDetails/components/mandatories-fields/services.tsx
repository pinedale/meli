import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type MandatoryAttr = {
  id: string;
  color: string;
  desc: string;
  duration_mins: string;
  kind: string;
  passing_score: string;
  title: string;
  status: string;
}

const useGetMandatory = (id: string | null | undefined): UseQueryResult<MandatoryAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<MandatoryAttr, AxiosError>(['mandatory-details'], async () => {
    const response = await authRequest.get<MandatoryAttr>(`/courses/${id}`);
    return response.data
  },{
    enabled: !!id
  })
}


export { useGetMandatory };

export type { MandatoryAttr };