import axios, { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";

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

const token = sessionStorage.getItem("token");

const useUsers = ({ params }: { params: Params }): UseQueryResult<Userlist, AxiosError> => {
  return useQuery<Userlist, AxiosError>(['users', params.page, params.items], async () => {
    const response = await axios.get<{ users: Userlist }>('https://backend-v2-sandbox.unatest.com/api/v2/users', {
      params,
      headers: {
        'Accept': '*/*',
        'X-Current-Organization': '01GEFTPWQ9M8PGXR4JVVRYKGSX',
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.data.users;
  }, {
    keepPreviousData: true,
    staleTime: 5000,
  });
};
export default useUsers;
export type { UserItem } 