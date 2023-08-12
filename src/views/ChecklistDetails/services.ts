import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useFetch } from "../../contexts/fetchProvider";

type Section = {
  id: number;
  rank: number;
  title: string;
}

type CategoryAttr = {
  id: string;
  rank: number;
  title: string;
  sections: Array<Section>;
}

type CategoryList = Array<CategoryAttr>

const useGetChecklistCategories = (id: string | null | undefined): UseQueryResult<CategoryList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<CategoryList, AxiosError>(['checklist-categories'], async () => {
    const response = await authRequest.get<{ categories:CategoryList }>(`/checklists/${id}/categories`);
    return response.data.categories
  },{
    enabled: !!id
  })
}

const useDeleteChecklistCategory = (): UseMutationResult<void, AxiosError, { checklistId: string, categoryId: string }, unknown> => {
  const { authRequest } = useFetch()
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, { checklistId: string, categoryId: string }, unknown>(async (data) => {
    const { checklistId, categoryId } = data;
    await authRequest.delete(`/checklists/${checklistId}/categories/${categoryId}`);
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['checklist-categories'])
        toast.success('Successfully deleted!')
      }
    }
  );
};

type Error = {
  response: {
    data: {
      error:{
        message: string;
        details: [],
      }
    }
  }
}

type CategoryAdd = {
  title: string;
}

const useAddChecklistCategory = (
  checklistId: string,
  options: UseMutationOptions<CategoryAdd, Error, CategoryAdd, unknown>
): UseMutationResult<CategoryAdd, Error, CategoryAdd, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(
    async (data) => {
      const response = await authRequest.post(`/checklists/${checklistId}/categories`, data)
      return response.data;
    },
    {
      ...options,
    }
  )
}

export { useGetChecklistCategories, useDeleteChecklistCategory, useAddChecklistCategory }

export type { CategoryAttr, CategoryAdd };