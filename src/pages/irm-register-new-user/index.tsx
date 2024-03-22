import CreateNewUser from "@/utils/CreateNewUser/CreateNewUser";
import { Container } from "@mantine/core";
import React from "react";

const UserModule = () => {
  return (
    <Container size={"xl"}>
      <CreateNewUser />
    </Container>
  );
};

export default UserModule;
