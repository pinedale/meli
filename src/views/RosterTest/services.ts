import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { AxiosError } from "axios";


type Question = {
  id: string;
  title: string;
  rank: string;
  answer_value: string;
  is_correct: boolean;
}

type Category = {
  id: string;
  title: string;
  rank: string;
  questions: Array<Question>
}

type TestResultAttr = {
  total_secs: number;
  user_full_name: string;
  id: string;
  title: string;
  started_at: string;
  ended_at: string;
  status: string;
  passed: boolean;
  score: number;
  assigned_on: string;
  categories: Category[];
}

const useGetTestResult = (id: string | null | undefined, testId: string | null | undefined): UseQueryResult<TestResultAttr, AxiosError> => {
  const { authRequest } = useFetch();
  return useQuery<TestResultAttr, AxiosError>(['tests-result'], async () => {
    const response = await authRequest.get<TestResultAttr>(`/users/${id}/tests/${testId}`);
    return response.data
  })
}

type OrganizationAttr = {
  id: string;
  title: string;
  desc: string;
  brand_color: string;
  secondary_color: string;
  street_address: string;
  logo_url: string;
}

const useGetOrganization = (): UseQueryResult<OrganizationAttr, AxiosError> => {
  const { authRequest } = useFetch();
  return useQuery<OrganizationAttr, AxiosError>(['organization'], async () => {
    const response = await authRequest.get<OrganizationAttr>('/organization');
    return response.data
  })
}

export { useGetTestResult, useGetOrganization };

export type {Question, Category}