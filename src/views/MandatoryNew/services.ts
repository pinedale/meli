import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type MandatoryAttr = {
  color: string | undefined;
  desc: string | undefined;
  duration_mins: string | undefined;
  kind: string | undefined;
  passing_score: string;
  title: string;
  status: string;
}

const useCreateMandatory = (
  options: UseMutationOptions<MandatoryAttr, AxiosError, MandatoryAttr, unknown>
): UseMutationResult<MandatoryAttr, AxiosError, MandatoryAttr, unknown> => {
  const { authRequest } = useFetch
  ();

  return useMutation(async (data) => {
      const response = await authRequest.post('/courses', data)
      return response.data;
    },
    options
  )
}

export {useCreateMandatory}
export type { MandatoryAttr };