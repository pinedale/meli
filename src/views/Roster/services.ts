import { AxiosError } from "axios";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { toast } from "react-toastify";

const useDeleteRoster = (): UseMutationResult<void, AxiosError, { user_id: string }> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { user_id: string }>(
    async ({ user_id }) => {
      await authRequest.delete(`/users/${user_id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        toast.success('Successfully deleted!');
      }
    }
  );
};

export { useDeleteRoster };