import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

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
): UseMutationResult<LoginResult, AxiosError, LoginData, unknown> => useMutation(
  async (data) => {
    const response = await axios.post('https://backend-v2-sandbox.unatest.com/api/v2/sign_in', data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    })

    return response.data;
  },
  options
)


export default useLogin;