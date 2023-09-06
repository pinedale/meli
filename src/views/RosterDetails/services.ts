import { AxiosError } from "axios";
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";
import { useFetch } from "../../contexts/fetchProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Error = {
  response: {
    status: number;
    data: {
      error: {
        message: string;
      }
    }
  }
}

type RosterAttr = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  role: string;
  attachment: string;
}

type ChecklistItem = {
  id: string;
  title: string;
  started_at: string;
  ended_at: string;
  status: string;
  assigned_on: string;
  score: string;
}

type ChecklistList = Array<ChecklistItem>

type TestItem = {
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

const useGetRosterInfo = (id: string): UseQueryResult<RosterAttr, Error> => {
  const { authRequest } = useFetch();
  const navigate = useNavigate();
  return useQuery<RosterAttr, Error>(['user-info'], async () => {
    const response = await authRequest.get<RosterAttr>(`/users/${id}`);
    return response.data
  },{
    enabled: !!id,
    onError: (error) => {
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/")
      }
    }
  })
}

const useGetUserTest = (id: string | null | undefined): UseQueryResult<TestList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<TestList, AxiosError>(['user-tests'], async () => {
    const response = await authRequest.get<{ user_tests: TestList }>(`/users/${id}/tests`);
    return response.data.user_tests
  }, {
    enabled: !!id
  })
}

const useGetUserChecklist = (id: string | null | undefined): UseQueryResult<ChecklistList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<ChecklistList, AxiosError>(['user-checklist'], async () => {
    const response = await authRequest.get<{ user_checklists: ChecklistList }>(`/users/${id}/checklists`);
    return response.data.user_checklists
  }, {
    enabled: !!id
  })
}

const useGetUserCourses = (id: string | null | undefined): UseQueryResult<CoursesList, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<CoursesList, AxiosError>(['user-courses'], async () => {
    const response = await authRequest.get<{ user_courses: CoursesList }>(`/users/${id}/courses`);
    return response.data.user_courses
  }, {
    enabled: !!id
  })
}

const useDeleteMandatory = (): UseMutationResult<void, AxiosError, { user_id: string | undefined, course_id: string }> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { user_id: string | undefined; course_id: string }>(
    async ({ user_id, course_id }) => { 
      await authRequest.delete(`/users/${user_id}/courses/${course_id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user-courses']);
        toast.success('Successfully deleted!');
      }
    }
  );
};

export { useGetUserTest, useGetUserChecklist, useGetUserCourses, useDeleteMandatory, useGetRosterInfo };
export type { TestItem, ChecklistItem, CourseItem, RosterAttr } 