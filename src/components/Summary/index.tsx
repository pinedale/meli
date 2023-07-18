
type SummaryProps = {
  stats?: {
    total: number;
    active: number;
    pending: number;
    inactive: number;
  }
}

const Summary: React.FC<SummaryProps> = ({stats}) => {

  return (
    <div className="border-b border-gray-200">
      <div className="grid justify-center max-w-6xl grid-cols-4 mx-auto text-slate-70 text-gray-700">
        <div className="py-7 text-center">
          <span className="uppercase">Total</span>
          <h3 className="text-5xl">{stats ? stats.total : ""}</h3>
        </div>
        <div className="py-7 text-center">
          <span className="uppercase">Active</span>
          <h3 className="text-5xl">{stats ? stats.active : ""}</h3>
        </div>
        <div className="py-7 text-center">
          <span className="uppercase">Pending</span>
          <h3 className="text-5xl">{stats ? stats.pending : ""}</h3>
        </div>
        <div className="py-7 text-center">
          <span className="uppercase">Inactive</span>
          <h3 className="text-5xl">{stats ? stats.inactive : ""}</h3>
        </div>
      </div>
    </div>
  )
}

export default Summary;