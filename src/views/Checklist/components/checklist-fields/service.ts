import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type Section = {
  id: number;
  rank: number;
  title: string;
}

type Category = {
  id: string;
  rank: number;
  title: string;
  sections?: Array<Section>;
}

type ChecklistFormAttr = {
  title: string;
  desc: string;
  color: string;
  kind: string;
  categories?: Array<Category>;
}

const useCreateChecklist = (
  options: UseMutationOptions<ChecklistFormAttr, AxiosError, ChecklistFormAttr, unknown>
): UseMutationResult<ChecklistFormAttr, AxiosError, ChecklistFormAttr, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async (data) => {
      const response = await authRequest.post('/checklists', data)
      return response.data;
    },
    options
  )
}

const useGetChecklist = (id: number | null | undefined): UseQueryResult<ChecklistFormAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<ChecklistFormAttr, AxiosError>(['checklist-details'], async () => {
    const response = await authRequest.get<ChecklistFormAttr>(`/checklists/${id}`);
    return response.data
  },{
    enabled: !!id
  })
}


export { useCreateChecklist, useGetChecklist };

export type { ChecklistFormAttr, Category };