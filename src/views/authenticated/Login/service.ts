import { useMutation } from 'react-query';
import axios from 'axios';

type LoginData = {
  email: string;
  password: string;
}

const useLogin = () => {
  const loginMutation = useMutation((data: LoginData) =>
    axios.post('https://backend-v2-sandbox.unatest.com/api/v2/sign_in', data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      } 
    })
  );

  const login = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
  };

  return {
    login,
    isLoading: loginMutation.isLoading,
    isError: loginMutation.isError,
    data: loginMutation.data,
  };
};

export default useLogin;