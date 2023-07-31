import { useNavigate } from "react-router-dom";
import useTestList from "../Test/service";
import { useChecklist } from "../Checklist/services";
import { useGetCourses } from "../Mandatories/services";
import { useGetBundleDetails } from "../BundleDetails/services";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import BundleItemList from "../BundleDetails/components/item-lists";
import { useBundleList } from "../Bundles/components/table/service";
import { Checkbox } from "flowbite-react";
import { useQueryClient } from "react-query";

const RosterInvite = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: testData, isLoading: testLoading } = useTestList({ params: { page: 1, items: 9999 } });
  const { data: checklistData, isLoading: checklistLoading } = useChecklist({ params: { page: 1, items: 9999 } });
  const { data: mandatoryData, isLoading: mandatoryLoading } = useGetCourses({ params: { page: 1, items: 9999 } });
  const { data: bundleList } = useBundleList({ params: { page: 1, items: 9999 } });
  const [selectedBundleId, setSelectedBundleId] = useState<string>();
  const { data: bundleDetails } = useGetBundleDetails(selectedBundleId ?? "");
  const [checkboxType, setCheckboxType] = useState<boolean>();

  const { handleSubmit, watch, register, setValue } = useForm<{ tests_ids: string[], checklists_ids: string[], courses_ids: string[]}>({
    defaultValues: {
      tests_ids: [],
      checklists_ids: [],
      courses_ids: [],
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

  const [combinedBundles, setCombinedBundles] = useState<{ tests_ids: string[], checklists_ids: number[], courses_ids: number[] }>({
    tests_ids: [],
    courses_ids: [],
    checklists_ids: [],
  });
  console.log("🚀 ~ file: index.tsx:49 ~ RosterInvite ~ combinedBundles:", combinedBundles)

  useEffect(() => {

    if (checkboxType) {
      const updatedBundles = {
        tests_ids: combinedBundles.tests_ids.concat(bundleDetails?.tests_ids ?? []),
        courses_ids: combinedBundles.courses_ids.concat(bundleDetails?.courses_ids ?? []),
        checklists_ids: combinedBundles.checklists_ids.concat(bundleDetails?.checklists_ids ?? []),
      };
      console.log("🚀 ~ file: index.tsx:59 ~ useEffect ~ updatedBundles:", updatedBundles)

      setCombinedBundles(updatedBundles);

      const stringifiedTestsIds = updatedBundles?.tests_ids.map((num) => num.toString());
      setValue("tests_ids", stringifiedTestsIds, { shouldDirty: false });

      const stringifiedChecklistIds = updatedBundles.checklists_ids.map((num) => num.toString());
      setValue("checklists_ids", stringifiedChecklistIds, { shouldDirty: false });

      const stringifiedMandatoriesIds = updatedBundles.courses_ids.map((num) => num.toString());
      setValue("courses_ids", stringifiedMandatoriesIds, { shouldDirty: false });
    }else {
      const updatedBundles = {
        tests_ids: combinedBundles.tests_ids.filter(id => !bundleDetails?.tests_ids?.includes(id)),
        courses_ids: combinedBundles.courses_ids.filter(id => !bundleDetails?.courses_ids?.includes(id)),
        checklists_ids: combinedBundles.checklists_ids.filter(id => !bundleDetails?.checklists_ids?.includes(id)),
      };
  
      setCombinedBundles(updatedBundles);
  
      setValue("tests_ids", updatedBundles.tests_ids.map(id => id.toString()), { shouldDirty: false });
      setValue("checklists_ids", updatedBundles.checklists_ids.map(id => id.toString()), { shouldDirty: false });
      setValue("courses_ids", updatedBundles.courses_ids.map(id => id.toString()), { shouldDirty: false });
    }
  }, [bundleDetails, checkboxType]);

  const onSubmit = handleSubmit((values) => {
    console.log("🚀 ~ file: index.tsx:42 ~ onSubmit ~ valuesssss:", values)
  });

  const handleBundleSelection = (bundleId: string, event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setSelectedBundleId(bundleId);
    queryClient.invalidateQueries(['bundle-details', selectedBundleId])
    if (event.currentTarget.checked) {
      setCheckboxType(true)
    } else {
      setCheckboxType(false)
    }
  };

  return (
    <div className="left-0 fixed h-screen w-full top-0 bottom-0 bg-white">
      <form onSubmit={onSubmit}>
        <div className="flex justify-between align-middle h-12 border-b border-gray-200 items-center px-5">
          <div>
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-400 hover:bg-gray-500 text-white w-20">Cancel</button>
          </div>
          <div><h1 className="text-base text-gray-700">Roster Invite</h1></div>
          <div>
            <button type="submit" className="bg-red-400 hover:border-red-600 text-white w-20">Save</button>
          </div>
        </div>
        <div className="overflow-y-auto h-screen pb-10">
          <div className="max-w-6xl mx-auto pt-14">
            <div className="mb-10">
              <h2 className="text-2xl text-gray-700 font-medium mb-4">Bundles</h2>
              <ul className="grid grid-cols-3">
                {
                  bundleList?.map((item) => (
                    <li className="mb-2" key={item.id}>
                      <label className="cursor-pointer flex items-center" htmlFor={`${item.id}`}>
                        <Checkbox value={item.id} id={`${item.id}`} onClick={(e) => handleBundleSelection(`${item.id}`, e)} />
                        <span className="pl-2 text-sm font-medium">{item.title}</span>
                      </label>

                    </li>
                  ))
                }
              </ul>
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

export default RosterInvite;