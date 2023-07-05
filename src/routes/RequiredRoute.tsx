import { Navigate, Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header";
import Menu from "../components/Menu";


const RequiredAuthRoute = () => {
  const location = useLocation()
  const token = sessionStorage.getItem('token');
  console.log("🚀 ~ file: RequiredRoute.tsx:9 ~ RequiredAuthRoute ~ tokenssss:", token)

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