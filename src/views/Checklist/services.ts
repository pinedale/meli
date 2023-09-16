import { AxiosError } from "axios";
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useFetch } from "../../contexts/fetchProvider";

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


type ChecklistResponse = {
  checklists: Array<ChecklistItem>;
  meta: {
    pagination: {
      count: number;
      page: number;
      prev: number | null;
      next: number;
      last: number;
    };
    stats: {
      total: number;
      active: number;
      pending: number;
      inactive: number;
    };
  };
}

const useGetChecklist = ({ params }: { params: Params }): UseQueryResult<ChecklistResponse, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<ChecklistResponse, AxiosError>(['checklist', params.page, params.items], async () => {
    const response = await authRequest.get<ChecklistResponse>('/checklists', {
      params,
    });

    return response.data;
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


export { useGetChecklist, useDeleteChecklist };
export type { ChecklistItem } 