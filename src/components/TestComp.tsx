import React, { useState } from "react";
import NavBar from "./NavBar";
import { Flex, Paper } from "@mantine/core";
import TestNav from "./TestNav";
import MantineTransition from "./transition/MantineTransition";
export const customNavAnim = {
  in: { opacity: 1, transform: "translateX(0px)" },
  out: { opacity: 0, transform: "translateX(-200px)" },
  common: { transformOrigin: "center" },
  transitionProperty: "transform, opacity",
};
const TestComp = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <TestNav setShow={setShow} show={show} />
      <Flex>
        <MantineTransition condition={show} transition={customNavAnim}>
          <NavBar setShow={setShow} />
        </MantineTransition>
        <div
          style={{
            padding: "80px 20px",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam fuga facere alias quasi autem voluptates
          expedita ipsum veritatis praesentium ea fugit iste aliquam, perspiciatis quisquam architecto? Omnis, expedita
          soluta? Hic.lore lorem3000
        </div>
      </Flex>
    </>
  );
};

export default TestComp;
