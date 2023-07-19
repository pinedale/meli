import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";

type ChecklistItem = {
  id: string;
  title: string;
  started_at: string;
  ended_at: string;
  status: string;
  assigned_on: string;
}

type ChecklistList = Array<ChecklistItem>

type TestItem ={
  id: string;
  title: string;
  started_at: string;
  ended_at: string;
  status: string;
  passed: boolean;
  score: number;
  assigned_on: string;
}

type TestList = Array<TestItem>

type CourseItem = {
  id: string;
  title: string;
  started_at: string;
  ended_at: string;
  status: string;
  passed: boolean;
  score: string;
  assigned_on: string;
}

type CoursesList = Array<CourseItem>

const useGetUserTest = (id: string | null | undefined): UseQueryResult<TestList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<TestList, AxiosError>(['user-tests'], async () => {
    const response = await authRequest.get<{ user_tests:TestList }>(`/users/${id}/tests`);
    return response.data.user_tests
  },{
    enabled: !!id
  })
}

const useGetUserChecklist = (id: string | null | undefined): UseQueryResult<ChecklistList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<ChecklistList, AxiosError>(['user-checklist'], async () => {
    const response = await authRequest.get<{ user_checklists:ChecklistList }>(`/users/${id}/checklists`);
    return response.data.user_checklists
  },{
    enabled: !!id
  })
}

const useGetUserCourses = (id: string | null | undefined): UseQueryResult<CoursesList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<CoursesList, AxiosError>(['user-courses'], async () => {
    const response = await authRequest.get<{ user_courses:CoursesList }>(`/users/${id}/courses`);
    return response.data.user_courses
  },{
    enabled: !!id
  })
}

export {useGetUserTest, useGetUserChecklist, useGetUserCourses};
export type { TestItem, ChecklistItem, CourseItem } 