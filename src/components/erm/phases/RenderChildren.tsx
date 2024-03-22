import { Phase } from "@/store/interface/ErmNewInterface";
import React, { useEffect, useState } from "react";
import useFormWrapper from "../genericComponents/useFormWrapper";
import { useAppSelector } from "@/store/store";
const editStatus = false;
const RenderChildren = ({
  planningChild,
  planningId,
  originalChildren,
}: {
  planningChild: Phase[];
  planningId: string;
  originalChildren?: Phase[];
}) => {
  const phaseData = useAppSelector((state) => state.auditData.audit);
  // const selectedChildren = originalChildren?.map((item) => item.INPUT_FIELD);
  // const [data, setData] = useState<any>(planningChild);
  const [count, setCount] = useState(0);

  const { form } = useFormWrapper({ formElements: planningChild });
  useEffect(() => {
    console.log("III", planningId);

    setCount((prev) => prev + 1);
    // if (+planningId === 3) {
    const selectedKeys = planningChild?.map((item) => item.INPUT_FIELD);
    const allKeys = Object.keys(phaseData?.createAuditItem || {});
    const filteredKeys = allKeys.filter((item) => selectedKeys?.includes(item));
    // console.log("BLOMIT", planningId, selectedKeys, allKeys, filteredKeys);
    // console.log("createAuditItem", phaseData?.createAuditItem);
    console.log("originalChildren", originalChildren, filteredKeys, phaseData);
    // console.log("XXX", filteredKeys, planningId);
    // }
    // console.log("aa", originalChildren, phaseData);
    // if (planningId === "3") console.log("TTTT", planningId, planningChild);
    // console.log(originalChildren?.map((item) => item.INPUT_FIELD));
  }, []);

  return <div>{form}</div>;
};

export default RenderChildren;

// console.log("phaseData", phaseData);

// for (let key in phaseData) {
//   const keysdata = Object.keys(phaseData[key]);

//   console.log("key", keysdata);
// }

// console.log(
//   "vaskar"
//   //originalChildren?.map((item) => item.INPUT_FIELD),
//   // Object.keys(phaseData),
//   // phaseData
// );
// console.log("vaskar", Object.keys(planningChild));
