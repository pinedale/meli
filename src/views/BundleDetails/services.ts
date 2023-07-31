import { AxiosError } from "axios";
import { UseMutationOptions, UseMutationResult, UseQueryResult, useMutation, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { toast } from "react-toastify";


type BundleAttr = {
  id: number;
  title: string;
  tests_ids: string[];
  courses_ids: number[];
  checklists_ids: number[];
}

const useGetBundleDetails = (id: string): UseQueryResult<BundleAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<BundleAttr, AxiosError>(['bundle-details', id], async () => {
    const response = await authRequest.get<BundleAttr>(`/bundles/${id}`);
    return response.data
  }, {
    enabled: !!id,
  })
}

type BundleFormAttr = {
  bundle:{
    tests_ids: string[];
    checklists_ids: string[];
    courses_ids: string[];
    title?: string | undefined;
  }
}

type Error = {
  response: {
    data: {
      error: {
        message: string;
      }
    }
  }
}

const useCreateBundle = (
  options: UseMutationOptions<BundleFormAttr, Error, BundleFormAttr, unknown>
): UseMutationResult<BundleFormAttr, Error, BundleFormAttr, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(
    async (data) => {
      const response = await authRequest.post('/bundles', data)
      return response.data;
    },
    {
      ...options,
      onError: (error) => {
        toast.error(error.response?.data?.error?.message)
      },
    }
  )
}

type UpdateBundleParams = {
  id: string | undefined;
  data: BundleFormAttr;
}

const useUpdateBundle = (
  options: UseMutationOptions<BundleFormAttr, AxiosError, UpdateBundleParams, unknown>
): UseMutationResult<BundleFormAttr, AxiosError, UpdateBundleParams, unknown> => {
  const { authRequest } = useFetch();

  return useMutation(async ({ id, data }) => {
      const response = await authRequest.patch(`/bundles/${id}`, data)
      return response.data;
    },
    options,
  )
}

export { useGetBundleDetails, useCreateBundle, useUpdateBundle };
export type { BundleAttr } 