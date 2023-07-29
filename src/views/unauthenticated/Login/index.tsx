import { unaLogo } from "../../../assets/images";
import { useForm } from 'react-hook-form';
import useLogin from './service';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from "react-toastify";
import { useFetch } from "../../../contexts/fetchProvider";

const schema = yup.object({
  email: yup.string().email("please enter a valid email").required("Required field"),
  password: yup.string().required("Required field"),
})

type LoginForm = {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { saveToken } = useFetch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { mutate } = useLogin({
    onSuccess: (data) => {
      const token = data.access;
      const roles = data.roles;
      saveToken(token, roles);
    },
    onError: (error) => {
      const errorMessage = error.message
      toast.error(`${errorMessage}`);
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutate(values)
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md shadow-md mx-auto p-14 rounded-md border border-gray-100">
        <div className="w-24 mx-auto mb-10">
          <img src={unaLogo} alt="Meli" className="w-full block" />
        </div>
        <h1 className="text-2xl text-gray-700 text-center mb-10">Login to UNA Admin</h1>
        <form onSubmit={onSubmit}>
          <div className="grid grid-rows-1 gap-3">
            <div className="flex gap-1 flex-col">
              <input
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                type="text"
                placeholder="Email"
                {...register('email', { required: 'Email es requerido' })}
              />
              <p className="text-xs text-red-app">{errors.email?.message}</p>
            </div>
            <div>
              <input
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Contraseña es requerida' })}
              />
              <p className="text-xs text-red-app">{errors?.password?.message}</p>
            </div>
            <div>

            </div>
            <div>
              <button type="submit" className="text-white bg-green-app focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;