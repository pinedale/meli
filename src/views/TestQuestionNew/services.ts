import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type QuestionAttr = {
  rank: string;
  title: string;
  answers: string[];
}

type QuestionFormParams = {
  testId: string;
  categoryId: string;
  data: QuestionAttr;
}

const useCreateTestQuestion = (
  options: UseMutationOptions<QuestionAttr, AxiosError, QuestionFormParams, unknown>
): UseMutationResult<QuestionAttr, AxiosError, QuestionFormParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ testId, categoryId, data }) => {
    const response = await authRequest.post(`/tests/${testId}/categories/${categoryId}/questions`, {question: data})
    return response.data;
  },
    options,
  )
}

export { useCreateTestQuestion }