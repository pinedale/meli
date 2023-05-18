import { Link } from "react-router-dom"
import { SearchResult } from "../../hooks/useSearchRequest"
import { NumericFormat } from 'react-number-format';

const BoxItem = ({ item }: { item: SearchResult }) => (
  <Link to={`/items/${item.id}`} key={item.id} className="py-4 border-gray-200 border-b flex last:border-0 text-slate-700 flex-col md:flex-row items-center md:items-start">
    <div className="w-44 h-44 bg-gray-100 mr-4 rounded-md min-w-44 flex-shrink-0">
      <img src={item.thumbnail} alt="" className="object-cover w-full h-full" />
    </div>
    <div className="w-full">
      <div className="flex justify-between">
        <h2 className="text-2xl"><NumericFormat  value={item.price} thousandSeparator="."  decimalSeparator="," prefix="$" className="bg-white"/></h2>
        <span className="text-xs pr-12">{item.address.state_name}</span>
      </div>
      <p className="text-lg">{item.title}</p>
    </div>
  </Link>
)

export default BoxItem