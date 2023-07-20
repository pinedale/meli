import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type TestAttr = {
  id: string;
  color: string;
  desc: string;
  duration_mins: string;
  kind: string;
  passing_score: string;
  title: string;
  status: string;
}

const useGetTest = (id: string | null | undefined): UseQueryResult<TestAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<TestAttr, AxiosError>(['test-details'], async () => {
    const response = await authRequest.get<TestAttr>(`/tests/${id}`);
    return response.data
  },{
    enabled: !!id
  })
}


export { useGetTest };

export type { TestAttr };