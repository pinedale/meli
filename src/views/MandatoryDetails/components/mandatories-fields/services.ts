import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

type MandatoryAttr = {
  desc: string | undefined;
  kind: string | undefined;
  passing_score: string;
  title: string;
  status: string | undefined;
}

type UpdateMandatoryParams = {
  id: string | undefined;
  data: MandatoryAttr;
}

const useGetMandatory = (id: string): UseQueryResult<MandatoryAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<MandatoryAttr, AxiosError>(['mandatory-details'], async () => {
    const response = await authRequest.get<MandatoryAttr>(`/courses/${id}`);
    return response.data
  },{
    enabled: !!id
  })
}

const useUpdateMandatory = (
  options: UseMutationOptions<MandatoryAttr, AxiosError, UpdateMandatoryParams, unknown>
): UseMutationResult<MandatoryAttr, AxiosError, UpdateMandatoryParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ id, data }) => {
      const response = await authRequest.patch(`/courses/${id}`, data)
      return response.data;
    },
    options
  )
}


export { useGetMandatory, useUpdateMandatory };

export type { MandatoryAttr };