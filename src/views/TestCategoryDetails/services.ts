import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { AxiosError } from "axios";

type Question = {
  id: string;
  rank: string;
  title: string;
  answers: string[];
}

type CategoryAttr = {
  id: string;
  rank: string;
  title: string;
  questions: Array<Question>
}


const useGetTestCategoryDetails = (id: string | null | undefined, categoryId: string | null | undefined): UseQueryResult<CategoryAttr, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<CategoryAttr, AxiosError>(['test-category-details'], async () => {
    const response = await authRequest.get<CategoryAttr>(`/tests/${id}/categories/${categoryId}`);
    return response.data
  }, {
    enabled: !!id
  })
}

export { useGetTestCategoryDetails }

export {type CategoryAttr, type Question};