import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type Question = {
  id: string;
  title: string;
  rank: string;
  is_randomized: boolean;
  answers: string[];
}

type ChapterAttr = {
  id: string;
  content: string;
  content_formatted: string;
  rank: string;
  title: string;
  questions: Array<Question>
}

const useGetMandatoryChapterDetails = (id: string | null | undefined, chapterId: string | null | undefined): UseQueryResult<ChapterAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<ChapterAttr, AxiosError>(['checklist-details'], async () => {
    const response = await authRequest.get<ChapterAttr>(`/courses/${id}/chapters/${chapterId}`);
    return response.data
  })
}

export { useGetMandatoryChapterDetails };

export type { Question, ChapterAttr }