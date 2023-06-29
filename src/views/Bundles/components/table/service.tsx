import axios, { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";

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

const token = sessionStorage.getItem("token");

const useBundleList = ({ params }: { params: Params }): UseQueryResult<Bundlelist, AxiosError> => {
  return useQuery<Bundlelist, AxiosError>(['bundles', params.page, params.items], async () => {
    const response = await axios.get<{bundles: Bundlelist}>('https://backend-v2-sandbox.unatest.com/api/v2/bundles', {
      params,
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.data.bundles;
  });
};

export default useBundleList;
export type {BundleItem} 