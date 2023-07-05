import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type Params = {
  page: number;
  items: number;
}

type BundleItem = {
  id: number;
  title: string;
  checklists_count: number;
  courses_count: number;
  tests_count: number,
  updated_at: string;
}

type Bundlelist = Array<BundleItem>

const useBundleList = ({ params }: { params: Params }): UseQueryResult<Bundlelist, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<Bundlelist, AxiosError>(['bundles', params.page, params.items], async () => {
    const response = await authRequest.get<{bundles: Bundlelist}>('/bundles');

    return response.data.bundles;
  });
};

export default useBundleList;
export type {BundleItem} 