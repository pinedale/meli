import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../contexts/fetchProvider";

import { useForm } from "react-hook-form";
import useTestList from "../Test/service";
import { useGetBundleDetails } from "./services";
import { useEffect } from "react";
import { useChecklist } from "../Checklist/services";
import BundleItemList from "./components/item-lists";
import { useGetCourses } from "../Mandatories/services";

const BundleDetails = () => {
  const navigate = useNavigate();
  const { organization } = useFetch();
  const { bundleId } = useParams()
  const { data: testData, isLoading: testLoading } = useTestList({ params: { page: 1, items: 9999 } });
  const { data: checklistData, isLoading: checklistLoading } = useChecklist({ params: { page: 1, items: 9999 } });
  const { data: mandatoryData, isLoading: mandatoryLoading } = useGetCourses({ params: { page: 1, items: 9999 } });
  const { data: bundleDetails } = useGetBundleDetails(bundleId ?? "");


  const handleClose = () => {
    navigate(`/organization/${organization}/bundles`);
  }

  const { handleSubmit, watch, register, setValue } = useForm<{ tests_ids: string[], checklists_ids: string[], courses_ids: string[], title: string }>({
    defaultValues: {
      tests_ids: [],
      checklists_ids: [],
      courses_ids: [],
      title: "",
    },
  });

  const selectedTestsIds = watch("tests_ids");
  const numberOfSelectedTests = selectedTestsIds ? selectedTestsIds?.length : 0;
  const activeTests = testData?.tests.filter(item => item.status === "active");

  const selectedChecklistIds = watch("checklists_ids");
  const numberOfSelectedChecklists = selectedChecklistIds ? selectedChecklistIds.length : 0;
  const activeChecklist = checklistData?.checklists.filter(item => item.status === "active");

  const selectedMandatoryIds = watch("courses_ids");
  const numberOfSelectedMandatories = selectedMandatoryIds ? selectedMandatoryIds.length : 0;
  const activeMandatory = mandatoryData?.courses.filter(item => item.status === "active");

  useEffect(() => {
    if (bundleDetails?.tests_ids) {
      const stringifiedTestsIds = bundleDetails.tests_ids.map((num) => num.toString());
      setValue("tests_ids", stringifiedTestsIds, { shouldDirty: false });
    }
    if (bundleDetails?.checklists_ids) {
      const stringifiedChecklistIds = bundleDetails.checklists_ids.map((num) => num.toString());
      setValue("checklists_ids", stringifiedChecklistIds, { shouldDirty: false });
    }
    if (bundleDetails?.courses_ids) {
      const stringifiedMandatoriesIds = bundleDetails.courses_ids.map((num) => num.toString());
      setValue("courses_ids", stringifiedMandatoriesIds, { shouldDirty: false });
    }
    setValue("title", bundleDetails?.title?? "")
  }, [bundleDetails, setValue]);

  const onSubmit = handleSubmit((values) => {
    console.log("🚀 ~ file: index.tsx:42 ~ onSubmit ~ valuesssss:", values)
  });

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <form onSubmit={onSubmit}>
        <div className="flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button type="button" onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div><h1 className="text-base text-gray-700">Edit Bundle</h1></div>
          <div>
            <button type="submit" className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
          </div>
        </div>
        <div className="overflow-y-auto h-screen pb-10">
          <div className="max-w-6xl mx-auto pt-14">
            <div className="mb-10">
              <label className="text-gray-700 text-xs mb-1 block">Title</label>
              <input
                className="w-full bg-gray-100 border rounded px-3 py-2 text-xs text-gray-700"
                type="text"
                placeholder="Enter title of bundle"
                {...register('title', { required: 'Title is required' })}
              />
            </div>
            <div className="mb-10">
              <BundleItemList
                testLoading={testLoading}
                numberOfSelectedItems={numberOfSelectedTests}
                activeItems={activeTests}
                register={register}
                registerValue="tests_ids"
                title="Test"
              />
            </div>
            <div className="mb-10">
              <BundleItemList
                testLoading={checklistLoading}
                numberOfSelectedItems={numberOfSelectedChecklists}
                activeItems={activeChecklist}
                register={register}
                registerValue="checklists_ids"
                title="Skills Checklists"
              />
            </div>
            <div className="mb-10">
              <BundleItemList
                testLoading={mandatoryLoading}
                numberOfSelectedItems={numberOfSelectedMandatories}
                activeItems={activeMandatory}
                register={register}
                registerValue="courses_ids"
                title="Mandatories"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BundleDetails;