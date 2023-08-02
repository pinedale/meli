import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type QuestionAttr = {
  title?: string;
  rank: number;
  is_randomized: boolean;
  answers: string[];
}

const useGetMandatoryQuestionDetails = (id: string | null | undefined, chapterId: string | null | undefined, questionId: string | null | undefined): UseQueryResult<QuestionAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<QuestionAttr, AxiosError>(['mandatory-question-detail'], async () => {
    const response = await authRequest.get<QuestionAttr>(`/courses/${id}/chapters/${chapterId}/questions/${questionId}`);
    return response.data
  })
}

type AddMandatoryQuestionOptionsParams = {
  id: string | undefined;
  chapterId: string | undefined;
  questionId: string | undefined;
  data: QuestionAttr;
}

const useAddMandatoryQuestionOption = (
  options: UseMutationOptions<QuestionAttr, AxiosError, AddMandatoryQuestionOptionsParams, unknown>
): UseMutationResult<QuestionAttr, AxiosError, AddMandatoryQuestionOptionsParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ id, chapterId, questionId, data }) => {
      const response = await authRequest.patch(`/courses/${id}/chapters/${chapterId}/questions/${questionId}`, data)
      return response.data;
    },
    options,
  )
}

export { useGetMandatoryQuestionDetails, useAddMandatoryQuestionOption };

export type { QuestionAttr }