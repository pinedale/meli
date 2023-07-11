import { AxiosError } from "axios"
import { UseQueryResult, useQuery } from "react-query"
import { useFetch } from "../../contexts/fetchProvider"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

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

type Error = {
  response: {
    status: number;
    data: {
      error:{
        message: string;
      }
    }
  }
}

const useProfile = (): UseQueryResult<ProfileInfoAttr, Error> =>{
  const navigate = useNavigate()
  const { authRequest } = useFetch();

  return useQuery<ProfileInfoAttr, Error>(['profile'], async() =>{
    const response = await authRequest.get<ProfileInfoAttr>('/profile');
    return response.data
  }, {onError: (error) => {
    if(error.response.status === 401){
      sessionStorage.clear();
      navigate("/")
    }
  }})
}

export { useProfile };

export type {ProfileInfoAttr}