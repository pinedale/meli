import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type QuestionAttr = {
  rank: string;
  title: string;
  correct_answer_index: string;
  is_randomized: boolean | string;
  answers: string[];
}

const useGetTestQuestionDetails = (testId: string, categoryId: string, questionId: string): UseQueryResult<QuestionAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<QuestionAttr, AxiosError>(['mandatory-details'], async () => {
    const response = await authRequest.get<QuestionAttr>(`/tests/${testId}/categories/${categoryId}/questions/${questionId}`);
    return response.data
  },{
    enabled: !!testId
  })
}

type UpdateTestQuestionParams = {
  testId: string;
  categoryId: string;
  questionId: string | undefined;
  data: QuestionAttr;
}

const useUpdateTestQuestion = (
  options: UseMutationOptions<QuestionAttr, AxiosError, UpdateTestQuestionParams, unknown>
): UseMutationResult<QuestionAttr, AxiosError, UpdateTestQuestionParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ testId, categoryId, questionId, data }) => {
      const response = await authRequest.patch(`/tests/${testId}/categories/${categoryId}/questions/${questionId}`, {question: data})
      return response.data;
    },
    options,
  )
}

export {useGetTestQuestionDetails, useUpdateTestQuestion};