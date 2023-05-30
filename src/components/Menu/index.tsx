import { Link } from "react-router-dom"



const Menu = () => {
  return (
    <div className="mx-auto border-gray-300 border-b border-t items-center flex justify-center">
      <ul className="flex">
        <li className="w-40 text-center">
          <Link className="py-3 text-slate-600 font-semibold inline-block" to="/roster">Roster</Link>
        </li>
        <li className="w-40 text-center">
          <Link className="py-3 text-slate-600 font-semibold inline-block" to="/test">Test</Link>
        </li>
        <li className="w-40 text-center">
          <Link className="py-3 text-slate-600 font-semibold inline-block" to="/checklist">Checklist</Link>
        </li>
        <li className="w-40 text-center">
          <Link className="py-3 text-slate-600 font-semibold inline-block" to="/mandatories">Mandatories</Link>
        </li>
        <li className="w-40 text-center">
          <Link className="py-3 text-slate-600 font-semibold inline-block" to="/docuements">Documents</Link>
        </li>
        <li className="w-40 text-center">
          <Link className="py-3 text-slate-600 font-semibold inline-block" to="/roster">Bundles</Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu