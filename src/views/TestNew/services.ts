import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type TestAttr = {
  color: string;
  desc: string | undefined;
  duration_mins: string;
  kind: string | undefined;
  passing_score: string;
  title: string;
  status: string;
}

type Error = {
  response: {
    data: {
      error: {
        message: string;
        details: [0];
      }
    }
  }
}

const useCreateTest = (
  options: UseMutationOptions<TestAttr, Error, TestAttr, unknown>
): UseMutationResult<TestAttr, Error, TestAttr, unknown> => {
  const { authRequest } = useFetch
  ();

  return useMutation(async (data) => {
      const response = await authRequest.post('/tests', data)
      return response.data;
    },
    options
  )
}

export {useCreateTest}
export type { TestAttr };