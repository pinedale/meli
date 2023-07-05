import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type Params = {
  page: number;
  items: number;
}

type TestItem = {
  id: number;
  status: string;
  title: string;
  categories_count: number;
  passing_score: number;
  questions_count: number;
  updated_at: string;
}

type Tests = Array<TestItem>

const useTestList = ({ params }: { params: Params }): UseQueryResult<Tests, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<Tests, AxiosError>(['tests', params.page, params.items], async () => {
    const response = await authRequest.get<{tests: Tests}>('/tests', {
      params,
    });

    return response.data.tests;
  });
};

export default useTestList;
export type {TestItem} 