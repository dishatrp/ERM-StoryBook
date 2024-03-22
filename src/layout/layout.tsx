import React, { useState } from "react";
import { Flex } from "@mantine/core";
import MantineTransition from "@/components/transition/MantineTransition";
import NavBar from "@/components/NavBar";
import TopNav from "@/components/TopNav";

export const customNavAnim = {
  in: { opacity: 1, transform: "translateX(0px)" },
  out: { opacity: 0, transform: "translateX(-200px)" },
  common: { transformOrigin: "center" },
  transitionProperty: "transform, opacity",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);

  return (
    <>
      <TopNav setShow={setShow} show={show} />
      <Flex>
        <MantineTransition condition={show} transition={customNavAnim}>
          <NavBar setShow={setShow} />
        </MantineTransition>
        <div
          style={{
            padding: "80px 20px 20px 20px",
            width: "100%",
          }}
        >
          {children}
        </div>
      </Flex>
    </>
  );
}
