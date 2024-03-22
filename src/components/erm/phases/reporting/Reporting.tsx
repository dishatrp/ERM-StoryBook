import { Phase } from "@/store/interface/ErmNewInterface";
import React, { useState } from "react";
import MantineTab from "../../genericComponents/MantineTab";
import { toCamelCase } from "../planning/Planning";
import RenderChildren from "../RenderChildren";

const Reporting = ({ data }: { data: Phase[] }) => {
  const [reporting, setReporting] = useState(data?.[0]?.ID);

  return (
    <>
      <MantineTab onTabChange={setReporting} value={reporting}>
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
                planningId={reporting}
              />
            </MantineTab.Panel>
          );
        })}
      </MantineTab>
    </>
  );
};

export default Reporting;
