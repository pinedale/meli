import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../contexts/fetchProvider";

type Params = {
  page: number;
  items: number;
}

type Test = {
  untaken: number;
  finished: number;
  started: number;
}

type Checklist = {
  untaken: number;
  finished: number;
  started: number;
}

type Courses = {
  untaken: number;
  finished: number;
  started: number;
}

type Attachment = {
  id: number;
  label: string;
  url: string;
}

type UserItem = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  role: string;
  status: string;
  tests: Test;
  checklists: Checklist;
  courses: Courses;
  attachment: Attachment;
}

type UserResponse = {
  users: Array<UserItem>;
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

const useUsers = ({ params }: { params: Params }): UseQueryResult<UserResponse, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<UserResponse, AxiosError>(['users', params.page, params.items], async () => {
    const response = await authRequest.get<UserResponse>('/users', { params });

    return response.data;
  }, {
    keepPreviousData: true,
    staleTime: 5000,
  });
};

export default useUsers;
export type { UserItem } 