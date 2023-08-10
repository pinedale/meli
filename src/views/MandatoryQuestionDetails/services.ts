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

const useGetMandatoryQuestionDetails = (courseId: string, chapterId: string, questionId: string): UseQueryResult<QuestionAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<QuestionAttr, AxiosError>(['mandatory-question-details'], async () => {
    const response = await authRequest.get<QuestionAttr>(`/courses/${courseId}/chapters/${chapterId}/questions/${questionId}`);
    return response.data
  },{
    enabled: !!courseId
  })
}

type UpdateTestQuestionParams = {
  courseId: string;
  chapterId: string;
  questionId: string | undefined;
  data: QuestionAttr;
}

const useUpdateMandatoryQuestion = (
  options: UseMutationOptions<QuestionAttr, AxiosError, UpdateTestQuestionParams, unknown>
): UseMutationResult<QuestionAttr, AxiosError, UpdateTestQuestionParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ courseId, chapterId, questionId, data }) => {
      const response = await authRequest.patch(`/courses/${courseId}/chapters/${chapterId}/questions/${questionId}`, {question: data})
      return response.data;
    },
    options,
  )
}

export {useGetMandatoryQuestionDetails, useUpdateMandatoryQuestion};