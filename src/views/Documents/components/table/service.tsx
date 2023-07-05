import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type Params = {
  page: number;
  items: number;
}

type ChecklistItem = {
  id: number;
  color: string;
  duration_mins: number | null;
  kind: string;
  status: string;
  title: string;
  categories_count: number;
  sections_count: number;
  questions_count: number;
  updated_at: string;
}

type Checklist = Array<ChecklistItem>

const useChecklist = ({ params }: { params: Params }): UseQueryResult<Checklist, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<Checklist, AxiosError>(['documents', params.page, params.items], async () => {
    const response = await authRequest.get<Checklist>('/checklists', {
      params,
    });

    return response.data; // Asumiendo que la respuesta contiene los datos en la propiedad "data"
  }, {
    keepPreviousData: true,
    staleTime: 5000,
  });
};
export default useChecklist;
export type {ChecklistItem} 