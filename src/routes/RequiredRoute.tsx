import { Navigate, Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header";
import Menu from "../components/Menu";
import useUser from "../hooks/useUser";


const RequiredAuthRoute = () => {

  const { user } = useUser()
  console.log("🚀 ~ file: RequiredRoute.tsx:10 ~ RequiredAuthRoute ~ user:", user)

  const location = useLocation()

  // TEMP : Initial storage 
  const token = JSON.parse(sessionStorage.getItem('token'));
  console.log("🚀 ~ file: RequiredRoute.tsx:10 ~ RequiredAuthRoute ~ token:", token)

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