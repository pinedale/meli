import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { AxiosError } from "axios";

type Answer = {
  question: string;
  value: string;
  is_correct: boolean;
}

type CourseResultAttr = {
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
  answers: Answer[];
}

const useGetCourseResult = (id: string | null | undefined, courseId: string | null | undefined): UseQueryResult<CourseResultAttr, AxiosError> => {
  const { authRequest } = useFetch();
  return useQuery<CourseResultAttr, AxiosError>(['course-result'], async () => {
    const response = await authRequest.get<CourseResultAttr>(`/users/${id}/courses/${courseId}`);
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

export { useGetCourseResult, useGetOrganization };