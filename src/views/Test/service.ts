import { AxiosError } from "axios";
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { toast } from "react-toastify";

type Params = {
  page: number;
  items: number;
}

type TestItem = {
  id: string;
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

const useDeleteTest = (): UseMutationResult<void, AxiosError, { test_id: string }> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { test_id: string }>(
    async ({ test_id }) => {
      await authRequest.delete(`/tests/${test_id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tests']);
        toast.success('Successfully deleted!');
      }
    }
  );
};

export {useTestList, useDeleteTest};
export type {TestItem} 