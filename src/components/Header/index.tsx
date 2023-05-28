import { unaLogo } from "../../assets/images"; 
const Header = () => {

  return (
    <div className="w-full py-5">
      <div className=" w-11/12 mx-auto">
        <div className="flex">
          <div className="w-[53px] mr-8">
            <img src={unaLogo} alt="Meli" className="w-full block" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header