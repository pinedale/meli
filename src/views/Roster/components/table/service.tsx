import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useFetch } from "../../../../contexts/fetchProvider";

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
  id: number;
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

type Userlist = Array<UserItem>

const useUsers = ({ params }: { params: Params }): UseQueryResult<Userlist, AxiosError> => {
  const { authRequest } = useFetch();

  return useQuery<Userlist, AxiosError>(['users', params.page, params.items], async () => {
    const response = await authRequest.get<{ users: Userlist }>('/users');

    return response.data.users;
  }, {
    keepPreviousData: true,
    staleTime: 5000,
  });
};

export default useUsers;
export type { UserItem } 