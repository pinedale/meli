import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useFetch } from "../contexts/fetchProvider";

const LayoutWithoutHeader = () => {
  const { organization} = useFetch()
  const location = useLocation()
  const { getToken } = useFetch()
  const token = getToken();

  if (!token || !organization) {
    return  <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default LayoutWithoutHeader