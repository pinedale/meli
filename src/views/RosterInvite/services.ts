import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { toast } from "react-toastify";

type RosterInviteFormAttr = {
  assessment_group:{
    tests_ids: string[];
    checklists_ids: string[];
    courses_ids: string[];
  }
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

type RosterInviteParams = {
  id: string | undefined;
  data: RosterInviteFormAttr;
}

const useCreateRosterInvite = (
  options: UseMutationOptions<RosterInviteFormAttr, Error, RosterInviteParams, unknown>
): UseMutationResult<RosterInviteFormAttr, Error, RosterInviteParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ id, data }) => {
      const response = await authRequest.post(`/users/${id}/assessment_groups`, data)
      return response.data;
    },
    {
      ...options,
      onError: (error) => {
        toast.error(error.response?.data?.error?.message)
      },
    }
  )
}

export {useCreateRosterInvite}