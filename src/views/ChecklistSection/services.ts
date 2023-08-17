import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type CategoryAttr = {
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

const useAddChecklistSection = (
  checklistId: string,
  categoryId: string,
  options: UseMutationOptions<CategoryAttr, Error, CategoryAttr, unknown>
): UseMutationResult<CategoryAttr, Error, CategoryAttr, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(
    async (data) => {
      const response = await authRequest.post(`/checklists/${checklistId}/categories/${categoryId}/sections`, data)
      return response.data;
    },
    {
      ...options,
    }
  )
}

export { useAddChecklistSection };
export type { CategoryAttr };