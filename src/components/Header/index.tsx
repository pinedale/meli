import { useForm } from "react-hook-form";
import { logo, searchIcon } from "../../assets"

import { useNavigate, useSearchParams } from "react-router-dom";

type FormValues = {
  search: string;
}

const Header = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("search");
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = ({ search }: { search: string }) => {
    navigate(`/items?search=${search}`)
  }

  return (
    <div className="bg-primary-yellow w-full py-5">
      <div className="w-4/5 mx-auto max-w-default">
        <div className="flex">
          <div className="w-[53px] mr-8">
            <img src={logo} alt="Meli" className="w-full block" />
          </div>
          <div className="relative w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("search", { value: query || '' })} type="text" className="w-full rounded px-4 py-1 text-lg bg-white text-black" />
              <button type="submit" className="absolute right-0 py-2 focus:outline-none hover:border-white bg-slate-200 rounded">
                <img src={searchIcon} alt="search icon" className="w-[18px]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header