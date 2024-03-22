import { Transition, TransitionProps } from "@mantine/core";
import { CSSProperties, ReactNode } from "react";

interface MantineTransitionProps {
  children: ReactNode;
  condition: boolean;
  duration?: number;
  transition?: TransitionProps["transition"];
  exitDuration?: number | undefined;
  userStyles?: CSSProperties;
}

const MantineTransition = ({
  children,
  condition,
  transition = "fade",
  duration = 500,
  exitDuration,
  userStyles,
}: MantineTransitionProps) => {
  return (
    <Transition
      mounted={condition}
      transition={transition}
      duration={duration}
      timingFunction='ease-in-out'
      exitDuration={exitDuration}
    >
      {(styles) => <div style={{ ...styles, ...userStyles }}>{children}</div>}
    </Transition>
  );
};

export default MantineTransition;
