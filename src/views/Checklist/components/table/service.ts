import { AxiosError } from "axios";
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import Checklist from "../..";
import { toast } from "react-toastify";
import { useFetch } from "../../../../contexts/fetchProvider";

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

const useChecklist = ({ params }: { params: Params }): UseQueryResult<Checklist, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<Checklist, AxiosError>(['checklist', params.page, params.items], async () => {
    const response = await authRequest.get<{ checklists: Checklist }>('/checklists', {
      params,
    });

    return response.data.checklists;
  });
};

const useDeleteChecklist = (): UseMutationResult<void, AxiosError, number> => {
  const { authRequest } = useFetch()
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, number>(async (checklistId: number) => {
    await authRequest.delete(`/checklists/${checklistId}`);
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['checklist'])
        toast.success('Successfully deleted!')
      }
    }
  );
};


export { useChecklist, useDeleteChecklist };
export type { ChecklistItem } 