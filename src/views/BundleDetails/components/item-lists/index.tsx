import { BeatLoader } from "react-spinners";
import { Checkbox } from "flowbite-react";
import { UseFormRegister } from "react-hook-form";
import { TestItem } from "../../../Test/service";
import { ChecklistItem } from "../../../Checklist/services";
import { CourseItem } from "../../../Mandatories/services";

type BundleItemListProps = {
  testLoading: boolean;
  numberOfSelectedItems: number;
  activeItems: TestItem[] | ChecklistItem[] | CourseItem[] | undefined;
  register: UseFormRegister<{ tests_ids: string[]; checklists_ids: string[]; courses_ids: string[], title: string }>;
  registerValue: "tests_ids" | "checklists_ids" | "courses_ids" | "title";
  title: string;
}

const BundleItemList: React.FC<BundleItemListProps>  = ({testLoading, numberOfSelectedItems, activeItems, register, registerValue, title}) => {

  return (
    <>
      {testLoading ?
        <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div> :
        <>
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl text-gray-700 font-medium">{title} ({numberOfSelectedItems})</h2>
          </div>
          <ul className="grid grid-cols-3">
            {
              activeItems?.map((item) => (
                <li className="mb-2" key={item.id}>
                  <label className="cursor-pointer flex items-center" htmlFor={`${registerValue}-${item.id}`}>
                    {/* <input {...register("checkbox")} type="checkbox" id={`${item.id}`} value={item.id} /> */}
                    <Checkbox value={item.id} id={`${registerValue}-${item.id}`} {...register(registerValue)} />
                    <span className="pl-2 text-sm font-medium">{item.title}</span>
                  </label>

                </li>
              ))
            }
          </ul>
        </>
      }
    </>
  )
}

export default BundleItemList