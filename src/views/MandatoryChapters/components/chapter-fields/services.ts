import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type Question = {
  id: string;
  rank: string;
  title: string;
}

type ChapterAttr = {
  id: string;
  rank: string;
  title: string;
  content: string;
  content_formatted: string,
  questions: Array<Question>
}

type UpdateMandatoryChapterParams = {
  id: string | undefined;
  chapterId: string | undefined; 
  data: ChapterAttr;
}

const useGetMandatoryChapterDetails = (id: string | null | undefined, chapterId: string | null | undefined): UseQueryResult<ChapterAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<ChapterAttr, AxiosError>(['mandatory-chapter-details'], async () => {
    const response = await authRequest.get<ChapterAttr>(`/courses/${id}/chapters/${chapterId}`);
    return response.data
  }, {
    enabled: !!id
  })
}

const useUpdateMandatoryChapter = (
  options: UseMutationOptions<ChapterAttr, AxiosError, UpdateMandatoryChapterParams, unknown>
): UseMutationResult<ChapterAttr, AxiosError, UpdateMandatoryChapterParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ id, chapterId, data }) => {
      const response = await authRequest.patch(`/courses/${id}/chapters/${chapterId}`, data)
      return response.data;
    },
    options,
  )
}

export { useGetMandatoryChapterDetails, useUpdateMandatoryChapter }

export type { ChapterAttr, Question };