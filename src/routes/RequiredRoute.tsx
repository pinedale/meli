import { Navigate, Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header";
import Menu from "../components/Menu";
import { useFetch } from "../contexts/fetchProvider";

const RequiredAuthRoute = () => {
  const location = useLocation()
  const { getToken } = useFetch()
  const token = getToken();

  return (
    token
      ?
      <>
        <Header />
        <Menu />
        <Outlet />
      </>
      : <Navigate to="/" state={{ from: location }} replace />
  )
}

export default RequiredAuthRoute