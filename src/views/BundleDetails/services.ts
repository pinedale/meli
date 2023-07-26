import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

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

type TestResponse = {
  tests: Array<TestItem>;
  meta: {
    pagination: {
      count: number;
      page: number;
      prev: number | null;
      next: number;
      last: number;
    };
    stats: {
      total: number;
      active: number;
      pending: number;
      inactive: number;
    };
  };
}

const useTestList = ({ params }: { params: Params }): UseQueryResult<TestResponse, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<TestResponse, AxiosError>(['tests', params.page, params.items], async () => {
    const response = await authRequest.get<TestResponse>('/tests', {
      params,
    });

    return response.data;
  });
};

type BundleAttr = {
  id: number;
  title: string;
  tests_ids: string[];
  courses_ids: number[];
  checklists_ids: number[];
}

const useGetBundleDetails = (id: string): UseQueryResult<BundleAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<BundleAttr, AxiosError>(['bundle-details'], async () => {
    const response = await authRequest.get<BundleAttr>(`/bundles/${id}`);
    return response.data
  }, {
    enabled: !!id
  })
}

export { useTestList, useGetBundleDetails };
export type { TestItem, BundleAttr } 