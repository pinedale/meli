import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type TestAttr = {
  id: string;
  color: string;
  desc: string;
  duration_mins: number;
  kind: string;
  passing_score: number;
  title: string;
  status: string;
}

const useGetTest = (id: any): UseQueryResult<TestAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<TestAttr, AxiosError>(['checklist-details'], async () => {
    const response = await authRequest.get<TestAttr>(`/tests/${id}`);
    return response.data
  })
}

export { useGetTest };