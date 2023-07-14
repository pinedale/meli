import axios from "axios";
import type { AxiosInstance, AxiosRequestHeaders } from "axios";
import { FunctionComponent, PropsWithChildren, createContext, useContext, useState } from "react";

type Roles = {
  name: string;
  organization: {
    id: string;
    title: string;
    logo_url: string;
  }
}

type FetchState = {
  authRequest: AxiosInstance;
  removeToken: () => void;
  saveToken: (token: string, roles: Array<Roles>) => void;
  organization: string;
  setOrganization: (id: string) => void;
  getToken: () => string | null | undefined;
  getRoles: () => string | null | undefined;
  roleType: string;
  setRoleType: (id: string) => void;
};

const FetchContext = createContext<FetchState | null>(null);

const TOKEN_KEY = "token";
const ROLE_KEY = "role";

const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

const saveToken = (token: string, role: Array<Roles>) => {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
};

const getToken = () => sessionStorage.getItem(TOKEN_KEY);
const getRoles = () => sessionStorage.getItem(ROLE_KEY);

const rolesArray = JSON.parse(getRoles() as string);
console.log("🚀 ~ file: fetchProvider.tsx:41 ~ rolesArray:", rolesArray)

const FetchProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState(getToken());

  const [organization, setOrganization] = useState(rolesArray ? rolesArray[0].organization.id: "");
  const [roleType, setRoleType] = useState(rolesArray ? rolesArray[0].name : "" )

  const authRequest = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
  });

  authRequest.interceptors.request.use(
    (config) => ({
      ...config,
      headers: {
        'Accept': '*/*',
        'Authorization': token ? `Bearer ${token}` : undefined,
        'X-Current-Organization': organization || undefined,
      } as AxiosRequestHeaders & { 'X-Current-Organization': string },
    }),
    (error) => Promise.reject(error)
  );

  authRequest.interceptors.response.use(
    (response) => {
      const token = response.data.access;
      if (token) {
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
        getRoles,
        roleType,
        setRoleType,
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
