import axios from "axios";
import type { AxiosInstance, AxiosRequestHeaders } from "axios";
import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  saveOrganization: (organization: string) => void;
  saveRole: (role: string) => void;
  organization: string;
  setOrganization: (id: string) => void;
  getToken: () => string | null | undefined;
  getRoles: () => string | null | undefined;
  getOrganizationId: () => string | null | undefined;
  roleType: string;
  setRoleType: (id: string) => void;
};

const FetchContext = createContext<FetchState | null>(null);

const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const ORGANIZATION_KEY = "organization";

const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

const FetchProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()

  const saveToken = (token: string, role: Array<Roles>) => {
    const roles = role.filter(item => item.name !== "corporate");
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(ROLE_KEY, roles[0].name);
    sessionStorage.setItem(ORGANIZATION_KEY, roles[0].organization.id);
    setOrganization(roles[0].organization.id);
    setRoleType(roles[0].name)
    navigate(`/organization/${roles[0].organization.id}/roster`)
  };

  const saveOrganization = (organization: string) => {
    sessionStorage.setItem(ORGANIZATION_KEY, organization);
  }

  const saveRole = (role: string) => {
    sessionStorage.setItem(ROLE_KEY, role);
  }
  
  const getToken = () => sessionStorage.getItem(TOKEN_KEY);
  const getRoles = () => sessionStorage.getItem(ROLE_KEY);
  const getOrganizationId = () => sessionStorage.getItem(ORGANIZATION_KEY);

  const [roleType, setRoleType] = useState(getRoles())
  const [organization, setOrganization] = useState(getOrganizationId());
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    const storedOrganization = sessionStorage.getItem(ORGANIZATION_KEY);
    if (storedOrganization) {
      setOrganization(storedOrganization);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(ORGANIZATION_KEY, organization || "");
  }, [organization]);

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
        saveOrganization,
        saveRole,
        organization: organization || "",
        setOrganization,
        getToken,
        getRoles,
        getOrganizationId,
        roleType: roleType || "",
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
