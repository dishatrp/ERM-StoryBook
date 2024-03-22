import { ScrollArea } from "@mantine/core";
import React from "react";
interface MantineScrollArea {
  children: React.ReactNode;
}
const MantineScrollArea = ({ children }: MantineScrollArea) => {
  return <ScrollArea>{children}</ScrollArea>;
};

export default MantineScrollArea;
