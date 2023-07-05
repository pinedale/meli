import { AxiosError } from "axios"
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query"
import { useFetch } from "../../../contexts/fetchProvider"


type Roles = {
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
  roles?: Array<Roles>
}


const useProfile = (): UseQueryResult<ProfileInfoAttr, AxiosError> => {
  const { authRequest } = useFetch();
  return useQuery<ProfileInfoAttr, AxiosError>(['profile'], async () => {
    const response = await authRequest.get<ProfileInfoAttr>('/profile');
    return response.data
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