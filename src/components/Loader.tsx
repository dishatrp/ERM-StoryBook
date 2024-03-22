import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { HashLoader } from "react-spinners";

const Loader = ({ opacity = 0.6, visible }: { opacity?: number; visible: boolean }) => {
  return (
    <LoadingOverlay
      loader={<HashLoader color='#36d7b7' />}
      overlayOpacity={opacity}
      // overlayOpacity={0.6}
      overlayColor='#ffffff'
      transitionDuration={500}
      visible={visible}
    />
  );
};

export default Loader;
