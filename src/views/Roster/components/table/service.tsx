import axios, { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";

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

// const useChecklist = ({ params }:{ params: Params}): UseQueryResult<Checklist, Error> => {
//   return useQuery<Checklist, Error>({
//     queryKey: ['list', params.page, params.items],
//     queryFn: async () => {
//       const response = await axios.get<Checklist>('https://backend-v2-sandbox.unatest.com/', { params })
//       return response
//     },
//     keepPreviousData: true,
//     staleTime: 5000,
//   })
// }
const token = sessionStorage.getItem("token");

const useChecklist = ({ params }: { params: Params }): UseQueryResult<Checklist, AxiosError> => {
  return useQuery<Checklist, AxiosError>(['list', params.page, params.items], async () => {
    const response = await axios.get<Checklist>('https://backend-v2-sandbox.unatest.com/api/v2/checklists', {
      params,
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.data; // Asumiendo que la respuesta contiene los datos en la propiedad "data"
  }, {
    keepPreviousData: true,
    staleTime: 5000,
  });
};
export default useChecklist;
export type {ChecklistItem} 