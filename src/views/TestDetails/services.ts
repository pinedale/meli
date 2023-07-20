import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type Question = {
  id: string;
  title: string;
  answers: string[];
  correct_answer_index: string;
  is_randomized: string;
  rank: string;
  kind: string;
}

type CategoryItem = {
  id: string;
  title: string;
  rank: string;
  questions: Array<Question>
}

type CategoryList = Array<CategoryItem>


const useGetTestCategories = (id: string | null | undefined): UseQueryResult<CategoryList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<CategoryList, AxiosError>(['user-checklist'], async () => {
    const response = await authRequest.get<{ categories:CategoryList }>(`/tests/${id}/categories`);
    return response.data.categories
  },{
    enabled: !!id
  })
}

export { useGetTestCategories }
export type {CategoryItem}