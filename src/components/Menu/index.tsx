import { NavLink } from "react-router-dom"



const Menu = () => {
  return (
    <div className="mx-auto border-gray-300 border-b border-t items-center flex justify-center">
      <ul className="flex">
        <li className="w-40 text-center">
          <NavLink className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")} to="/roster">Roster</NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")} to="/test">Test</NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")} to="/checklist">Checklist</NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")} to="/mandatories">Mandatories</NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")} to="/docuements">Documents</NavLink>
        </li>
        <li className="w-40 text-center">
          <NavLink className={({ isActive }) => (isActive ? "text-red-app py-3 font-semibold block border-b-2 border-red-app hover:text-red-app" : "py-3 text-slate-600 font-semibold hover:text-red-app w-full block border-b-2 border-white")} to="/bundles">Bundles</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Menu