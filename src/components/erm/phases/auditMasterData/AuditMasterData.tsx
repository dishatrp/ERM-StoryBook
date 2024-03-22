import { Phase } from "@/store/interface/ErmNewInterface";
import React from "react";
import useFormWrapper from "../../genericComponents/useFormWrapper";
import MantineTab from "../../genericComponents/MantineTab";
import { toCamelCase } from "../planning/Planning";
import RenderChildren from "../RenderChildren";
interface AuditMasterData {
  data: Phase[];
}

const AuditMasterData = ({ data }: AuditMasterData) => {
  return (
    <>
      <MantineTab defaultValue={data?.[0]?.ID}>
        <MantineTab.List>
          {data?.map((item) => {
            return (
              <MantineTab.Tab value={item.ID} key={item.ID}>
                {item.NAME}
              </MantineTab.Tab>
            );
          })}
        </MantineTab.List>

        {data?.map((item) => {
          return (
            <MantineTab.Panel value={item.ID} key={item.ID}>
              <RenderChildren
                planningChild={
                  item?.children?.map((child: Phase) => {
                    return {
                      ...child,
                      INPUT_FIELD: `${toCamelCase(item.INPUT_FIELD || "")}.${child.INPUT_FIELD}`, //${toCamelCase(item.ID || "")}.
                    };
                  }) || []
                }
                planningId={""}
              />
            </MantineTab.Panel>
          );
        })}
      </MantineTab>
    </>
  );
};

export default AuditMasterData;
