import { Phase } from "@/store/interface/ErmNewInterface";
import { useState } from "react";
import MantineTab from "../../genericComponents/MantineTab";
import RenderChildren from "../RenderChildren";

export const toCamelCase = (input: string): string => {
  return input.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const Planning = ({ data }: { data: Phase[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <MantineTab value={String(activeTab)} onTabChange={setActiveTab}>
      <MantineTab.List>
        {data?.map((item, idx) => {
          return (
            <MantineTab.Tab value={String(idx)} key={item.ID}>
              {item.NAME}
            </MantineTab.Tab>
          );
        })}
      </MantineTab.List>

      {/* <MantineTab.Panel value={String(activeTab)}>
        <RenderChildren
          planningChild={
            data?.[activeTab]?.children?.map((child: Phase) => {
              return {
                ...child,
                INPUT_FIELD: `${toCamelCase(data?.[activeTab].INPUT_FIELD || "")}.${child.INPUT_FIELD}`,
              };
            }) || []
          }
          planningId={data?.[activeTab]?.ID}
          originalChildren={data?.[activeTab]?.children || []}
        />
      </MantineTab.Panel> */}
      {data?.map((item, idx) => {
        return (
          <MantineTab.Panel value={String(idx)} key={item.ID}>
            <RenderChildren
              planningChild={
                item?.children?.map((child: Phase) => {
                  return {
                    ...child,
                    INPUT_FIELD: `${toCamelCase(item.INPUT_FIELD || "")}.${child.INPUT_FIELD}`, //${toCamelCase(item.ID || "")}.
                  };
                }) || []
              }
              planningId={data?.[activeTab]?.ID}
              originalChildren={item?.children || []}
            />
          </MantineTab.Panel>
        );
      })}
    </MantineTab>
  );
};

export default Planning;
