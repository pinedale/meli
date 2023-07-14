import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";
import { toast } from "react-toastify";

type Section = {
  id: number;
  rank: number;
  title: string;
}

type ChapterAttr = {
  id: string;
  rank: number;
  title: string;
  sections?: Array<Section>;
}

type ChapterList = Array<ChapterAttr>

const useGetMandatoryChapters = (id: string | null | undefined): UseQueryResult<ChapterList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<ChapterList, AxiosError>(['mandatory-chapters'], async () => {
    const response = await authRequest.get<{ chapters: ChapterList }>(`/courses/${id}/chapters`);
    return response.data.chapters
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

const useAddMandatoryChapter = (
  mandatoryId: string,
  options: UseMutationOptions<ChapterAdd, Error, ChapterAdd, unknown>
): UseMutationResult<ChapterAdd, Error, ChapterAdd, unknown> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient()

  return useMutation(
    async (data) => {
      const response = await authRequest.post(`/courses/${mandatoryId}/chapters`, data)
      return response.data;
    },
    {
      ...options,
      onError: (error) => {
        toast.error(error.response?.data?.error?.message)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['mandatory-chapters'])
        toast.success('Successfully added!');
      }
    }
  )
}


export { useGetMandatoryChapters, useAddMandatoryChapter }

export type { ChapterAttr, ChapterAdd };