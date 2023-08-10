import { AxiosError } from "axios";
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { toast } from "react-toastify";

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

  return useQuery<ChapterAttr, AxiosError>(['mandatory-chapter-details'], async () => {
    const response = await authRequest.get<ChapterAttr>(`/courses/${id}/chapters/${chapterId}`);
    return response.data
  })
}

type DeleteMandatoryQuestionParams = {
  course_id: string;
  chapter_id: string;
  question_id: string;
}


const useDeleteMandatoryQuestion = (): UseMutationResult<void, AxiosError, DeleteMandatoryQuestionParams> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, DeleteMandatoryQuestionParams>(
    async ({ course_id, chapter_id, question_id }) => { 
      await authRequest.delete(`/courses/${course_id}/chapters/${chapter_id}/questions/${question_id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mandatory-chapter-details']);
        toast.success('Successfully deleted!');
      }
    }
  );
};

export { useGetMandatoryChapterDetails, useDeleteMandatoryQuestion };

export type { Question, ChapterAttr, DeleteMandatoryQuestionParams }