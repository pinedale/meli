import { Dropdown } from "flowbite-react";
import { unaLogo } from "../../assets/images";

import { useFetch } from "../../contexts/fetchProvider";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../views/Profile/service";

const Header = () => {
  const { data } = useProfile();
  const { roleType } = useFetch()
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear();
    navigate("/")
  }

  const dropdownLabel = <div className=" text-right">
    <span>{data?.first_name} {data?.last_name}</span>
    <p className="text-red-app capitalize">{roleType}</p>
  </div>

  return (
    <div className="w-full py-3">
      <div className=" w-11/12 mx-auto">
        <div className="flex justify-between">
          <div className="w-[53px] mr-8 pt-2">
            <img src={unaLogo} alt="Meli" className="w-full block" />
          </div>
          {/* <div>
            <form>
              <select>
                
              </select>
            </form>
          </div> */}
          <div>
            <Dropdown
              className=" hover:border-white hover:border-0"
              label={dropdownLabel}
              inline
            >
              <Dropdown.Item className="text-xs font-medium" onClick={() => navigate(`/profile`)}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item className="text-xs font-medium" onClick={logout}>
                Logout
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header