import axios, { AxiosError } from "axios"
import { UseQueryResult, useQuery } from "react-query"


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
const token = sessionStorage.getItem("token");

const useProfile = (): UseQueryResult<ProfileInfoAttr, AxiosError> =>{
  return useQuery<ProfileInfoAttr, AxiosError>(['profile'], async() =>{
    const response = await axios.get<ProfileInfoAttr>('https://backend-v2-sandbox.unatest.com/api/v2/profile', {
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data
  })
}

export { useProfile };

export type {ProfileInfoAttr}