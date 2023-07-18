import { NavLink } from "react-router-dom"
import { useFetch } from "../../contexts/fetchProvider"



const Menu = () => {
  const { organization } = useFetch()
  console.log("🚀 ~ file: index.tsx:8 ~ Menu ~ organization:", organization)
  return (
    <div className="mx-auto border-gray-300 border-b border-t items-center flex justify-center">
      <ul className="flex">
        <li className="w-40 text-center">
          <NavLink
            className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")}
            to={`/organization/${organization}/roster`}
          >
            Roster
          </NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink
            className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")}
            to={`/organization/${organization}/test`}
          >
            Test
          </NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink
            className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")}
            to={`/organization/${organization}/checklist`}
          >
            Checklist
          </NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink
            className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")}
            to={`/organization/${organization}/mandatories`}
          >
            Mandatories
          </NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink
            className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")}
            to={`/organization/${organization}/bundles`}
          >
            Bundles
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Menu