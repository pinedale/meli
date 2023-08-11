import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type Question = {
  id: string;
  title: string;
  rank: string;
}

type Section = {
  id: number;
  rank: number;
  title: string;
  questions: Array<Question>;
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
  status: string;
  categories?: Array<Category>;
}

type UpdateChecklistParams = {
  id: string | undefined;
  data: ChecklistFormAttr;
}

const useUpdateChecklist = (
  options: UseMutationOptions<ChecklistFormAttr, AxiosError, UpdateChecklistParams, unknown>
): UseMutationResult<ChecklistFormAttr, AxiosError, UpdateChecklistParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ id, data }) => {
    const response = await authRequest.patch(`/checklists/${id}`, data)
    return response.data;
  },
    options,
  )
}

const useGetChecklist = (id: string | null | undefined): UseQueryResult<ChecklistFormAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<ChecklistFormAttr, AxiosError>(['checklist-details'], async () => {
    const response = await authRequest.get<ChecklistFormAttr>(`/checklists/${id}`);
    return response.data
  }, {
    enabled: !!id
  })
}


export { useUpdateChecklist, useGetChecklist };

export type { ChecklistFormAttr, Category };