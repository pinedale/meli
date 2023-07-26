import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";

import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { Checkbox } from "flowbite-react";
import { useGetBundleDetails, useTestList } from "./services";
import { useEffect } from "react";

const BundleDetails = () => {
  const navigate = useNavigate();
  const { organization } = useFetch();
  const { bundleId } = useParams()

  const { data: testData, isLoading: testLoading } = useTestList({ params: { page: 1, items: 9999 } });
  const { data: bundleDetails } = useGetBundleDetails(bundleId ?? "");
  console.log("🚀 ~ file: index.tsx:16 ~ BundleDetails ~ bundleDetails:", bundleDetails)

  const bundleString = bundleDetails?.tests_ids.map(num => num.toString())
  console.log("🚀 ~ file: index.tsx:19 ~ BundleDetails ~ bundleString:", bundleString)

  const { register, setValue, handleSubmit, watch} = useForm<{tests_ids: string[]}>({
    defaultValues: {
      tests_ids: [],
    },
  });

  const selectedTestsIds = watch("tests_ids"); 
  const numberOfSelectedTests = selectedTestsIds.length;
  console.log("🚀 ~ file: index.tsx:30 ~ BundleDetails ~ numberOfSelectedTests:", numberOfSelectedTests)
  
  const activeTests = testData?.tests.filter(item => item.status === "active");

  const handleClose = () => {
    navigate(`/organization/${organization}/bundles`);
  }

  useEffect(() => {
    if (bundleDetails?.tests_ids) {
      const stringifiedTestsIds = bundleDetails.tests_ids.map((num) => num.toString());
      setValue("tests_ids", stringifiedTestsIds, { shouldDirty: false });
    }
  }, [bundleDetails, setValue]);

  const onSubmit = handleSubmit((values) => {
    console.log("🚀 ~ file: index.tsx:42 ~ onSubmit ~ valuesssss:", values)
  });

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <form onSubmit={onSubmit}>
        <div className=" flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button type="button" onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div><h1 className="text-base text-gray-700">Edit Bundle</h1></div>
          <div>
            <button type="submit" className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
          </div>
        </div>
        <div className="overflow-y-auto h-full pb-10">
          {testLoading ?
            <div className="flex items-center"><BeatLoader color="#F98080" className="mx-auto block" /></div> :
            <div className="max-w-6xl mx-auto pt-14">
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl text-gray-700 font-medium">Tests ({numberOfSelectedTests})</h2>
              </div>
              <ul className="grid grid-cols-3">
                {
                  activeTests?.map((item) => (
                    <li className="mb-2" key={item.id}>
                      <label className="cursor-pointer flex items-center" htmlFor={`${item.id}`}>
                        {/* <input {...register("checkbox")} type="checkbox" id={`${item.id}`} value={item.id} /> */}
                        <Checkbox value={item.id} id={`${item.id}`} {...register("tests_ids")}/>
                        <span className="pl-2 text-sm font-medium">{item.title}</span>
                      </label>
                      
                    </li>
                  ))
                }
                <li></li>
              </ul>
            </div>
          }
        </div>
      </form>
    </div>
  )
}

export default BundleDetails;