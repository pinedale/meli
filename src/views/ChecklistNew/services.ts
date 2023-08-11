import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type Question = {
  id: string;
  title: string;
  rank: string;
}

type Section = {
  id: number;
  rank: number;
  title: string;
  questions: Array<Question>;
}

type Category = {
  id: string;
  rank: number;
  title: string;
  sections?: Array<Section>;
}
type ChecklistFormAttr = {
  title: string;
  desc: string;
  color: string;
  kind: string;
  categories?: Array<Category>;
  status: string | undefined;
}

const useCreateChecklist = (
  options: UseMutationOptions<ChecklistFormAttr, AxiosError, ChecklistFormAttr, unknown>
): UseMutationResult<ChecklistFormAttr, AxiosError, ChecklistFormAttr, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async (data) => {
      const response = await authRequest.post('/checklists', data)
      return response.data;
    },
    options
  )
}

export { useCreateChecklist };
export type { ChecklistFormAttr };