import { Phase } from "@/store/interface/ErmNewInterface";
import React, { useState } from "react";
import MantineTab from "../../genericComponents/MantineTab";
import RenderChildren from "../RenderChildren";
import { toCamelCase } from "../planning/Planning";

const Execution = ({ data }: { data: Phase[] }) => {
  const [execution, setExecution] = useState(data?.[0]?.ID);

  return (
    <>
      <MantineTab value={execution} onTabChange={setExecution}>
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
                planningId={execution}
              />
            </MantineTab.Panel>
          );
        })}
      </MantineTab>
    </>
  );
};

export default Execution;
