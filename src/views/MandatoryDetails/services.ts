import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { toast } from "react-toastify";

type Question = {
  id: number;
  rank: number;
  title: string;
}

type ChapterAttr = {
  id: string;
  rank: number;
  title: string;
  questions?: Array<Question>;
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

  return useMutation(
    async (data) => {
      const response = await authRequest.post(`/courses/${mandatoryId}/chapters`, data)
      return response.data;
    },
    {
      ...options,
    }
  )
}

type DeleteTestChapterParams = {
  course_id: string;
  chapter_id: string;
}

const useDeleteMandatoryChapter = (): UseMutationResult<void, AxiosError, DeleteTestChapterParams> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, DeleteTestChapterParams>(
    async ({ course_id, chapter_id }) => { 
      await authRequest.delete(`/courses/${course_id}/chapters/${chapter_id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mandatory-chapters']);
        toast.success('Successfully deleted!');
      }
    }
  );
};


export { useGetMandatoryChapters, useAddMandatoryChapter, useDeleteMandatoryChapter }

export type { ChapterAttr, ChapterAdd, DeleteTestChapterParams };