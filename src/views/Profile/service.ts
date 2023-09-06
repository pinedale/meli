import { AxiosError } from "axios"
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query"
import { useFetch } from "../../contexts/fetchProvider"
import { useNavigate } from "react-router-dom"


type RoleItem = {
  name: string,
  organization: {
    id: string,
    title: string,
    logo_url: string,
  }
}

type ProfileInfoAttr = {
  first_name: string,
  last_name: string,
  email: string,
  phone_number?: string,
  roles?: Array<RoleItem>
}

type Error = {
  response: {
    status: number;
    data: {
      error: {
        message: string;
      }
    }
  }
}


const useProfile = (): UseQueryResult<ProfileInfoAttr, Error> => {
  const navigate = useNavigate()
  const { authRequest } = useFetch();
  return useQuery<ProfileInfoAttr, Error>(['profile'], async () => {
    const response = await authRequest.get<ProfileInfoAttr>('/profile');
    return response.data
  }, {
    onError: (error) => {
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/")
      }
    }
  })
}



const useUpdateProfile = (
  options: UseMutationOptions<ProfileInfoAttr, AxiosError, ProfileInfoAttr, unknown>
): UseMutationResult<ProfileInfoAttr, AxiosError, ProfileInfoAttr, unknown> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => {
      const response = await authRequest.put('/profile', { profile: data })
      queryClient.invalidateQueries('profile')
      return response.data;
    },
    options
  )
}

export { useProfile, useUpdateProfile };
export type { RoleItem }