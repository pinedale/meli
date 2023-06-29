import axios, { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";

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

const token = sessionStorage.getItem("token");

const useGetCourses = ({ params }: { params: Params }): UseQueryResult<Courses, AxiosError> => {
  return useQuery<Courses, AxiosError>(['list', params.page, params.items], async () => {
    const response = await axios.get<{courses: Courses}>('https://backend-v2-sandbox.unatest.com/api/v2/courses', {
      params,
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.data.courses;
  }, {
    keepPreviousData: true,
    staleTime: 5000,
  });
};

export default useGetCourses;
export type {CourseItem} 