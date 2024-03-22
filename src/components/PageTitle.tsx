import { Title, rem } from "@mantine/core";

type propTypes = {
  children: React.ReactNode;
  mb?: string;
  mt?: string;
};

export default function PageTitle({ children, mb, mt }: propTypes) {
  return (
    <Title
      order={3}
      mb={mb}
      mt={mt}
    >
      {children}
    </Title>
  );
}
