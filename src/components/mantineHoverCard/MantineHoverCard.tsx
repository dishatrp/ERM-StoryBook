import { HoverCard, Text } from "@mantine/core";
import React, { ReactNode } from "react";

interface MantineHoverCard {
  target: ReactNode;
  value: ReactNode;
}

const MantineHoverCard = ({ target, value }: MantineHoverCard) => {
  return (
    <>
      <HoverCard withArrow shadow='md' position='top'>
        <HoverCard.Target>{target}</HoverCard.Target>
        <HoverCard.Dropdown>{value}</HoverCard.Dropdown>
      </HoverCard>
    </>
  );
};

export default MantineHoverCard;
