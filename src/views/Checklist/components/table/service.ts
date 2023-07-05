import axios, { AxiosError } from "axios";
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import Checklist from "../..";

type Params = {
  page: number;
  items: number;
}

type ChecklistItem = {
  id: number;
  color: string;
  duration_mins: number | null;
  kind: string;
  status: string;
  title: string;
  categories_count: number;
  sections_count: number;
  questions_count: number;
  updated_at: string;
}

type Checklist = Array<ChecklistItem>

const token = sessionStorage.getItem("token");

const useChecklist = ({ params }: { params: Params }): UseQueryResult<Checklist, AxiosError> => {
  return useQuery<Checklist, AxiosError>(['checklist', params.page, params.items], async () => {
    const response = await axios.get<{checklists: Checklist}>('https://backend-v2-sandbox.unatest.com/api/v2/checklists', {
      params,
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.data.checklists;
  });
};

const useDeleteChecklist = (): UseMutationResult<void, AxiosError, number> => {

  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, number>(async (checklistId: number) => {
    await axios.delete(`https://backend-v2-sandbox.unatest.com/api/v2/checklists/${checklistId}`, {
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  {
    onSuccess: () => queryClient.invalidateQueries(['checklist'])
  }
);};


export {useChecklist, useDeleteChecklist};
export type {ChecklistItem} 