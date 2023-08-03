import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type Question = {
  id: string;
  rank: string;
  title: string;
  answers: string[];
}

type CategoryAttr = {
  id: string;
  rank: string;
  title: string;
  questions: Array<Question>
}


const useGetTestCategoryDetails = (id: string | null | undefined, categoryId: string | null | undefined): UseQueryResult<CategoryAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<CategoryAttr, AxiosError>(['test-category-details'], async () => {
    const response = await authRequest.get<CategoryAttr>(`/tests/${id}/categories/${categoryId}`);
    return response.data
  }, {
    enabled: !!id
  })
}

type DeleteTestQuestionParams = {
  test_id: string;
  category_id: string;
  question_id: string;
}


const useDeleteTestQuestion = (): UseMutationResult<void, AxiosError, DeleteTestQuestionParams> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, DeleteTestQuestionParams>(
    async ({ test_id, category_id, question_id }) => { 
      await authRequest.delete(`/tests/${test_id}/categories/${category_id}/questions/${question_id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['test-category-details']);
        toast.success('Successfully deleted!');
      }
    }
  );
};

export { useGetTestCategoryDetails, useDeleteTestQuestion }

export {type CategoryAttr, type Question, type DeleteTestQuestionParams};