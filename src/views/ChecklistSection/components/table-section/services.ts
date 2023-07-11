import { UseQueryResult, useQuery } from "react-query";
import { AxiosError } from "axios";
import { useFetch } from "../../../../contexts/fetchProvider";

type Section = {
  id: string;
  rank: number;
  title: string;
}

type Category = {
  id: string;
  rank: number;
  title: string;
  sections?: Array<Section>;
}


const useGetChecklistInfo = (id: string | null | undefined, categoryId: string | null | undefined): UseQueryResult<Category, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<Category, AxiosError>(['checklist-details'], async () => {
    const response = await authRequest.get<Category>(`/checklists/${id}/categories/${categoryId}`);
    return response.data
  },{
    enabled: !!id
  })
}

export { useGetChecklistInfo }