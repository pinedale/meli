import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";


type BundleAttr = {
  id: number;
  title: string;
  tests_ids: string[];
  courses_ids: number[];
  checklists_ids: number[];
}

const useGetBundleDetails = (id: string): UseQueryResult<BundleAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<BundleAttr, AxiosError>(['bundle-details'], async () => {
    const response = await authRequest.get<BundleAttr>(`/bundles/${id}`);
    return response.data
  }, {
    enabled: !!id
  })
}

export { useGetBundleDetails };
export type { BundleAttr } 