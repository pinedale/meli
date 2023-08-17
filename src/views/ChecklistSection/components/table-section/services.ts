import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useFetch } from "../../../../contexts/fetchProvider";
import { toast } from "react-toastify";

type Question = {
  id: string;
  title: string;
  rank: string;
}

type Section = {
  id: string;
  rank: number;
  title: string;
  questions: Array<Question>
}

type SectionResponse = {
  sections: Array<Section>
}

const useGetChecklistSection = (id: string, categoryId: string,): UseQueryResult<SectionResponse, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<SectionResponse, AxiosError>(['checklist-sections'], async () => {
    const response = await authRequest.get<SectionResponse>(`/checklists/${id}/categories/${categoryId}/sections`);
    return response.data
  })
}

type QuestionForm = {
  title: string;
}

type Error = {
  response: {
    data: {
      error: {
        message: string;
      }
    }
  }
}

const useAddChecklistSectionQuestion = (
  checklistId: string,
  categoryId: string,
  sectionId: string,
  options: UseMutationOptions<QuestionForm, Error, QuestionForm, unknown>
): UseMutationResult<QuestionForm, Error, QuestionForm, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(
    async (data) => {
      const response = await authRequest.post(`/checklists/${checklistId}/categories/${categoryId}/sections/${sectionId}/questions`, data)
      return response.data;
    },
    {
      ...options,
    }
  )
}

type DeleteChecklistQuestionParams = {
  checklistId: string;
  categoryId: string;
  sectionId: string;
  questionId: string;
}

const useDeleteChecklistQuestion = (): UseMutationResult<void, AxiosError, DeleteChecklistQuestionParams> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, DeleteChecklistQuestionParams>(
    async ({ checklistId, categoryId, sectionId, questionId }) => {
      await authRequest.delete(`/checklists/${checklistId}/categories/${categoryId}/sections/${sectionId}/questions/${questionId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['checklist-sections']);
        toast.success('Successfully deleted!');
      }
    }
  );
};

export { useGetChecklistSection, useAddChecklistSectionQuestion, useDeleteChecklistQuestion }

export type { Section, Question, QuestionForm, DeleteChecklistQuestionParams }