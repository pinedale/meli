import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";
import { toast } from "react-toastify";

type RosterFormAttr = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  role: string;
  phone_number?: string;
  attachment: string;
}

type RosterFormRequestAtrr = {
  user:{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    bio: string;
    role: string;
    phone_number?: string;
    attachment: string;
  }
}

type Error = {
  response: {
    data: {
      error:{
        message: string;
      }
    }
  }
}

const useCreateRoster = (
  options: UseMutationOptions<RosterFormAttr, Error, RosterFormRequestAtrr, unknown>
): UseMutationResult<RosterFormAttr, Error, RosterFormRequestAtrr, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(
    async (data) => {
      const response = await authRequest.post('/users', data)
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

const useGetRoster = (id: string | null): UseQueryResult<RosterFormAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<RosterFormAttr, AxiosError>(['users'], async () => {
    const response = await authRequest.get<RosterFormAttr>(`/users/${id}`);
    return response.data
  },{
    enabled: !!id
  })
}

export { useGetRoster, useCreateRoster }
export type { RosterFormAttr };