/** @format */

import { Flex, rem } from "@mantine/core";
import Buttons from "../Button";
import React from "react";

type RegisterNewClientButtonProp = {
  onclickPrev: () => void;
  onClickNext?: () => void;
  type: "submit" | "reset" | "button" | undefined;
  disabled: boolean;
  onSubmitHandler?: (value: any) => void;
  isLoading?: boolean;
};

const RegisterNewClientButton = ({
  onclickPrev,
  type,
  onClickNext,
  disabled,
  onSubmitHandler,
  isLoading,
}: RegisterNewClientButtonProp) => {
  return (
    <Flex
      align='center'
      justify='flex-end'
      gap={rem(20)}
      mt={rem(32)}
    >
      <Buttons
        onClick={onclickPrev}
        variant='default'
      >
        Back
      </Buttons>
      {type === "submit" && (
        <Buttons
          type={type}
          onSubmit={onSubmitHandler}
          disabled={disabled}
          isLoading={isLoading}
        >
          Submit
        </Buttons>
      )}
      {type === "button" && (
        <Buttons
          type={type}
          onClick={onClickNext}
          disabled={disabled}
        >
          Next step
        </Buttons>
      )}
    </Flex>
  );
};

export default RegisterNewClientButton;
