import { Phase } from "@/store/interface/ErmNewInterface";
import React, { useState } from "react";
import MantineTab from "../../genericComponents/MantineTab";
import RenderChildren from "../RenderChildren";
import { toCamelCase } from "../planning/Planning";

const Preparation = ({ data }: { data: Phase[] }) => {
  const [preparation, setPreparation] = useState(data?.[0]?.ID);

  return (
    <MantineTab value={preparation} onTabChange={setPreparation}>
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
                    INPUT_FIELD: `${toCamelCase(item.INPUT_FIELD || "")}.${child.INPUT_FIELD}`,
                    TAB_ID: preparation,
                  };
                }) || []
              }
              planningId={preparation}
            />
          </MantineTab.Panel>
        );
      })}
    </MantineTab>
  );
};

export default Preparation;
