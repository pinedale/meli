import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useFetch } from '../../../contexts/fetchProvider';

type LoginData = {
  email: string;
  password: string;
}

type Organization = {
  id: string;
  title: string;
  logo_url: string;
}

type Roles = {
  name: string;
  organization: Organization;
}

type LoginResult = {
  csrf: string;
  access: string;
  access_expires_at: string;
  refresh: string;
  refresh_expires_at: string;
  roles: Array<Roles>;
}

const useLogin = (
  options: UseMutationOptions<LoginResult, AxiosError, LoginData, unknown>
): UseMutationResult<LoginResult, AxiosError, LoginData, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(
    async (data) => {
      const response = await authRequest.post(`${import.meta.env.VITE_API_ENDPOINT}/sign_in`, data)

      return response.data;
    },
    options
  )
}


export default useLogin;