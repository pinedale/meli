import axios, { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";

const token = sessionStorage.getItem("token");

type ChecklistFormAttr = {
  title: string;
  desc: string;
  color: string;
  kind: string;
}

const useCreateChecklist = (
  options: UseMutationOptions<ChecklistFormAttr, AxiosError, ChecklistFormAttr, unknown>
): UseMutationResult<ChecklistFormAttr, AxiosError, ChecklistFormAttr, unknown> => useMutation(
  async (data) => {
    const response = await axios.post('https://backend-v2-sandbox.unatest.com/api/v2/checklists', data, {
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    })

    return response.data;
  },
  options
)

const useGetChecklist = (id: number): UseQueryResult<ChecklistFormAttr, AxiosError> =>{
  return useQuery<ChecklistFormAttr, AxiosError>(['checklist-details'], async() =>{
    const response = await axios.get<ChecklistFormAttr>(`https://backend-v2-sandbox.unatest.com/api/v2/checklists/${id}`, {
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data
  })
}


export { useCreateChecklist, useGetChecklist };

export type { ChecklistFormAttr };