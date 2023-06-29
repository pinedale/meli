import axios, { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";

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

export { useCreateChecklist };

export type { ChecklistFormAttr };