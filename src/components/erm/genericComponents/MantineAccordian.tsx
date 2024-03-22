import { Collapse, Flex, Paper, useMantineTheme } from "@mantine/core";
import React, { ReactNode } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface Accordian {
  value: string;
  children: ReactNode;
  onChange: (val: string) => void;
  restrictCheckboxClick?: boolean;
}
interface AccordianItem {
  value?: string;
  children: ReactNode;
  onChange?: (val: string) => void;
  itemId: string;
  restrictCheckboxClick?: boolean;
}
interface AccordianControl {
  children: React.ReactNode;
  condition?: boolean;
  onClick?: (e: any) => void;
}
interface AccordianPanel {
  children: React.ReactNode;
  condition?: boolean;
}

const AccordianControl = ({ children, condition, onClick }: AccordianControl) => {
  const theme = useMantineTheme();
  return (
    <>
      <Flex
        justify={"space-between"}
        align={"center"}
        onClick={onClick}
        sx={(theme) => {
          return {
            borderRadius: theme.other.spacing.s12,
            marginBottom: theme.other.spacing.s20,
            padding: theme.other.spacing.s20,
            cursor: "pointer",
            //border: 0,
            boxShadow: "2px 4px 10px 0px rgba(0, 0, 0, 0.05)",
            backgroundColor: theme.colors.gray[0],
            transition: "all 0.3s ease-out",
            ":hover": {
              backgroundColor: theme.colors.gray[1],
            },
          };
        }}
      >
        {children}

        <IconChevronDown
          style={{
            transform: !condition ? "rotate(0deg)" : "rotate(180deg)",
            transition: "all 0.3s ease-out",
            stroke: theme.colors.black[2],
          }}
        />
      </Flex>
    </>
  );
};

const AccordianPanel = ({ children, condition = false }: AccordianPanel) => {
  return (
    <Collapse in={condition} animateOpacity>
      <Paper
        sx={(theme) => {
          return {
            backgroundColor: theme.colors.gray[0],
            borderRadius: theme.other.spacing.s16,
            border: `1px dashed ${theme.colors.gray[4]}`,
            padding: theme.other.spacing.s20,
            marginBottom: theme.other.spacing.s20,
          };
        }}
      >
        {children}
      </Paper>
    </Collapse>
  );
};

const AccordianItem = ({ itemId, onChange = () => {}, value, children, restrictCheckboxClick }: AccordianItem) => {
  const renderChildren = () => {
    return React.Children.map(children, (accItemControl: any, idx: number) => {
      if (idx === 0) {
        return React.cloneElement(accItemControl, {
          condition: itemId === value,
          onClick: (e) => {
            const target = e.target as HTMLElement;
            if (target?.classList?.toString()?.toLowerCase()?.includes("checkbox") && restrictCheckboxClick) return;

            if (itemId === value) {
              onChange("");
              return;
            }

            onChange(itemId);
          },
        });
      }
      if (idx === 1) {
        return React.cloneElement(accItemControl, {
          condition: itemId === value,
        });
      }
    });
  };
  return <>{renderChildren()}</>;
};

const MantineAccordian = ({ children, onChange, value, restrictCheckboxClick = true }: Accordian) => {
  const renderChildren = () => {
    return React.Children.map(children, (accItem: any, idx: number) => {
      return React.cloneElement(accItem, {
        onChange,
        value,
        restrictCheckboxClick,
      });
    });
  };
  return <>{renderChildren()}</>;
};

MantineAccordian.Item = AccordianItem;
MantineAccordian.Control = AccordianControl;
MantineAccordian.Panel = AccordianPanel;

export default MantineAccordian;
