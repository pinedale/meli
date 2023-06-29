import axios, { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";

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

const token = sessionStorage.getItem("token");

const useTestList = ({ params }: { params: Params }): UseQueryResult<Tests, AxiosError> => {
  return useQuery<Tests, AxiosError>(['tests', params.page, params.items], async () => {
    const response = await axios.get<{tests: Tests}>('https://backend-v2-sandbox.unatest.com/api/v2/tests', {
      params,
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.data.tests;
  });
};

export default useTestList;
export type {TestItem} 