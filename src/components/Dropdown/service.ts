import { AxiosError } from "axios"
import { UseQueryResult, useQuery } from "react-query"
import { useFetch } from "../../contexts/fetchProvider"

type Roles = {
  name:string,
  organization: {
    id:string,
    title:string,
    logo_url:string,
  }
}

type ProfileInfoAttr = {
  first_name: string,
  last_name: string,
  email: string,
  phone_number?: string,
  roles?: Array<Roles>
}

const useProfile = (): UseQueryResult<ProfileInfoAttr, AxiosError> =>{
  const { authRequest, setOrganization } = useFetch();
  setOrganization('01GEFTPWQ9M8PGXR4JVVRYKGSX')
  return useQuery<ProfileInfoAttr, AxiosError>(['profile'], async() =>{
    const response = await authRequest.get<ProfileInfoAttr>('/profile');
    return response.data
  })
}

export { useProfile };

export type {ProfileInfoAttr}