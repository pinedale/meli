import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useFetch } from "../../contexts/fetchProvider";

type RosterFormAttr = {
  first_name: string;
  last_name: string;
  email: string;
  bio: string | undefined;
  role: string;
  phone_number: string | undefined;
  attachment: string | undefined;
}

type RosterFormRequestAtrr = {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    bio: string | undefined;
    role: string;
    phone_number: string | undefined;
    attachment: string | undefined;
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

export { useCreateRoster }
export type { RosterFormAttr };