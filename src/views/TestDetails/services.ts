import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { toast } from "react-toastify";

type Question = {
  id: string;
  title: string;
  answers: string[];
  correct_answer_index: string;
  is_randomized: string;
  rank: string;
  kind: string;
}

type CategoryItem = {
  id: string;
  title: string;
  rank: string;
  questions: Array<Question>
}

type CategoryList = Array<CategoryItem>


const useGetTestCategories = (id: string | null | undefined): UseQueryResult<CategoryList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<CategoryList, AxiosError>(['test-categories'], async () => {
    const response = await authRequest.get<{ categories:CategoryList }>(`/tests/${id}/categories`);
    return response.data.categories
  },{
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

type CategoryAttr = {
  title: string;
}

const useAddTestCategory = (
  testId: string,
  options: UseMutationOptions<CategoryAttr, Error, CategoryAttr, unknown>
): UseMutationResult<CategoryAttr, Error, CategoryAttr, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(
    async (data) => {
      const response = await authRequest.post(`/tests/${testId}/categories`, data)
      return response.data;
    },
    {
      ...options,  
    }
  )
}

const useDeleteTestCategory = (): UseMutationResult<void, AxiosError, { test_id: string | undefined, category_id: string }> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { test_id: string | undefined; category_id: string }>(
    async ({ test_id, category_id }) => { 
      await authRequest.delete(`/tests/${test_id}/categories/${category_id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['test-categories']);
        toast.success('Successfully deleted!');
      }
    }
  );
};


export { useGetTestCategories,useAddTestCategory, useDeleteTestCategory }
export type {CategoryItem, CategoryAttr}