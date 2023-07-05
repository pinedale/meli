import axios from "axios";
import type { AxiosInstance, AxiosRequestHeaders } from "axios";
import { FunctionComponent, PropsWithChildren, createContext, useContext, useState } from "react";

type FetchState = {
  authRequest: AxiosInstance;
  removeToken: () => void;
  saveToken: (token: string) => void;
  organization: string;
  setOrganization: (id: string) => void;
  getToken: () => string | null | undefined;
};

const FetchContext = createContext<FetchState | null>(null);

const TOKEN_KEY = "token";

const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

const saveToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => sessionStorage.getItem(TOKEN_KEY);

const FetchProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [organization, setOrganization] = useState('01GEFTPWQ9M8PGXR4JVVRYKGSX')

  const authRequest = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
  });

  authRequest.interceptors.request.use(
    (config) => ({
      ...config,
      headers: {
        'Accept': '*/*',
        'Authorization': token ? `Bearer ${token}`: undefined,
        'X-Current-Organization': organization || undefined,
      } as AxiosRequestHeaders & { 'X-Current-Organization': string },
    }),
    (error) => Promise.reject(error)
  );

  authRequest.interceptors.response.use(
    (response) => {
      const token = response.data.access;
      if (token){
        setToken(token)
        authRequest.defaults.headers['Authorization'] = token
      }
     return response 
    },
    (error) => Promise.reject(error)
  );

  return (
    <FetchContext.Provider
      value={{
        authRequest,
        removeToken,
        saveToken,
        organization,
        setOrganization,
        getToken,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

const useFetch = (): FetchState => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error("useFetch must be used within a FetchProvider");
  }

  return context;
};
export { FetchProvider, useFetch };
