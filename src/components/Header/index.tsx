import { unaLogo } from "../../assets/images"; 
import useUser from "../../hooks/useUser";
import Dropdown from "../Dropdown";
const Header = () => {
  const { user } = useUser()
  console.log("🚀 ~ file: index.tsx:6 ~ Header ~ user:", user)
  const roles = JSON.parse(sessionStorage.getItem("roles"));
  console.log("🚀 ~ file: index.tsx:6 ~ Header ~ roles:", roles)


  const userData = {...roles[0]}
  console.log("🚀 ~ file: index.tsx:11 ~ Header ~ userData:", userData)
  
  return (
    <div className="w-full py-5">
      <div className=" w-11/12 mx-auto">
        <div className="flex justify-between">
          <div className="w-[53px] mr-8">
            <img src={unaLogo} alt="Meli" className="w-full block" />
          </div>
          <div>
            <Dropdown userData={userData}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header