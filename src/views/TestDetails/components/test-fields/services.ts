import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type TestAttr = {
  id: string;
  color: string;
  desc: string;
  duration_mins: string;
  passing_score: string;
  title: string;
  status: string;
  kind: string | undefined;
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

type TestFormAttr = {
  color: string;
  desc: string | undefined;
  duration_mins: string;
  kind: string | undefined;
  passing_score: string;
  title: string;
  status: string;
}

type UpdateTestParams = {
  id: string | undefined;
  data: TestFormAttr;
}

const useUpdateTest = (
  options: UseMutationOptions<TestFormAttr, AxiosError, UpdateTestParams, unknown>
): UseMutationResult<TestFormAttr, AxiosError, UpdateTestParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ id, data }) => {
      const response = await authRequest.patch(`/tests/${id}`, data)
      return response.data;
    },
    options,
  )
}


export { useGetTest, useUpdateTest };

export type { TestAttr, TestFormAttr };