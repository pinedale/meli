import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type Params = {
  page: number;
  items: number;
}

type CourseItem = {
  id: number;
  status: string;
  title: string;
  passing_score: number;
  chapters_count: number;
  questions_count: number;
  updated_at: string;
}

type CoursesResponse = {
  courses: Array<CourseItem>;
  meta: {
    pagination: {
      count: number;
      page: number;
      prev: number | null;
      next: number;
      last: number;
    };
    stats: {
      total: number;
      active: number;
      pending: number;
      inactive: number;
    };
  };
}

const useGetCourses = ({ params }: { params: Params }): UseQueryResult<CoursesResponse, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<CoursesResponse, AxiosError>(['mandatories', params.page, params.items], async () => {
    const response = await authRequest.get<CoursesResponse>('/courses', {
      params,
    });

    return response.data;
  }, {
    keepPreviousData: true,
    staleTime: 5000,
  });
};

export { useGetCourses };
export type { CourseItem } 