import { Dropdown } from "flowbite-react";
import { unaLogo } from "../../assets/images";

import { useFetch } from "../../contexts/fetchProvider";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../views/Profile/service";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";

const Header = () => {
  const { data, isLoading } = useProfile();
  const queryClient = useQueryClient()
  const { roleType, organization, setOrganization, setRoleType, saveOrganization, saveRole } = useFetch()
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  }

  const handleDropdown = (values: string) => {
    const roleItem = data?.roles?.find(role => role.organization.id === values);
    setRoleType(roleItem?.name || "");
    saveRole(roleItem?.name || "");
    setOrganization(roleItem?.organization.id || "");
    saveOrganization(roleItem?.organization.id || "");
    navigate(`/organization/${roleItem?.organization.id}/roster`);
    window.location.reload();
    queryClient.invalidateQueries(['profile', 'users'])
  }

  const unTakenRoles = data?.roles?.filter(item => item.name !== "corporate" && item.organization.id !== organization);
  const selectedRole = data?.roles?.find(item => item.organization.id === organization);

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
          <div>
            {
              isLoading
                ? <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div>
                : (
                  unTakenRoles && unTakenRoles?.length > 0 &&
                  <Dropdown label={`${selectedRole?.organization.title} - ${selectedRole?.name}`}>
                  {unTakenRoles?.map((role) => (
                    <Dropdown.Item key={role.organization.id} onClick={() => handleDropdown(role.organization.id)}>
                      {role.organization.title} - {role.name.replace(/_/g, ' ')}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                )
            }
          </div>
          <div>
            <Dropdown
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