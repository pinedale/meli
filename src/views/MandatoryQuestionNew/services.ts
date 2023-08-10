import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type QuestionAttr = {
  rank: string;
  title: string;
  answers: string[];
}

type QuestionFormParams = {
  courseId: string;
  chapterId: string;
  data: QuestionAttr;
}

const useCreateMandatoryQuestion = (
  options: UseMutationOptions<QuestionAttr, AxiosError, QuestionFormParams, unknown>
): UseMutationResult<QuestionAttr, AxiosError, QuestionFormParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ courseId, chapterId, data }) => {
    const response = await authRequest.post(`/courses/${courseId}/chapters/${chapterId}/questions`, {question: data})
    return response.data;
  },
    options,
  )
}

export { useCreateMandatoryQuestion }