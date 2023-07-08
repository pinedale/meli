import { AxiosError } from "axios";
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";
import { toast } from "react-toastify";

type Params = {
  page: number;
  items: number;
}

type BundleItem = {
  id: number;
  title: string;
  checklists_count: number;
  courses_count: number;
  tests_count: number,
  updated_at: string;
}

type Bundlelist = Array<BundleItem>

const useBundleList = ({ params }: { params: Params }): UseQueryResult<Bundlelist, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<Bundlelist, AxiosError>(['bundles', params.page, params.items], async () => {
    const response = await authRequest.get<{bundles: Bundlelist}>('/bundles', {params});

    return response.data.bundles;
  });
};

const useDeleteBundle = (): UseMutationResult<void, AxiosError, number> => {
  const { authRequest } = useFetch()
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, number>(async (checklistId: number) => {
    await authRequest.delete(`/bundles/${checklistId}`);
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bundles'])
        toast.success('Successfully deleted!')
      }
    }
  );
};

export { useBundleList, useDeleteBundle };
export type { BundleItem } 