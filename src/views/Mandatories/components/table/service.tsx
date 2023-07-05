import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

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

type Courses = Array<CourseItem>

const useGetCourses = ({ params }: { params: Params }): UseQueryResult<Courses, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<Courses, AxiosError>(['madatories', params.page, params.items], async () => {
    const response = await authRequest.get<{courses: Courses}>('/courses', {
      params,
    });

    return response.data.courses;
  }, {
    keepPreviousData: true,
    staleTime: 5000,
  });
};

export default useGetCourses;
export type {CourseItem} 