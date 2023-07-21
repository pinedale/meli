import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type QuestionAttr = {
  id: string;
  title: string;
  rank: string;
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

export { useGetMandatoryQuestionDetails };

export type { QuestionAttr }