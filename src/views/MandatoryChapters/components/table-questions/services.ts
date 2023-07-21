import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";
import { toast } from "react-toastify";

type QuestionAttr = {
  id: number;
  rank: number;
  title: string;
  is_randomized: boolean,
}

type QuestionList = Array<QuestionAttr>;

const useGetMandatoryChapterDetails = (id: string | null | undefined, chapterId: string | null | undefined): UseQueryResult<QuestionList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<QuestionList, AxiosError>(['mandatory-chapter-questions'], async () => {
    const response = await authRequest.get<{questions: QuestionList}>(`/courses/${id}/chapters/${chapterId}/questions`);
    return response.data.questions
  }, {
    enabled: !!id
  })
}

type Error = {
  response: {
    data: {
      error:{
        message: string;
      }
    }
  }
}

type ChapterAdd = {
  title: string;
}

const useAddMandatoryChapterQuestion = (
  mandatoryId: string,
  chapterId: string,
  options: UseMutationOptions<ChapterAdd, Error, ChapterAdd, unknown>
): UseMutationResult<ChapterAdd, Error, ChapterAdd, unknown> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient()

  return useMutation(
    async (data) => {
      const response = await authRequest.post(`/courses/${mandatoryId}/chapters/${chapterId}/questions`, data)
      return response.data;
    },
    {
      ...options,
      onError: (error) => {
        toast.error(error.response?.data?.error?.message)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['mandatory-chapter-questions'])
        toast.success('Successfully added!');
      }
    }
  )
}


export { useGetMandatoryChapterDetails, useAddMandatoryChapterQuestion }

export type { QuestionAttr, ChapterAdd };