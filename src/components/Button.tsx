import { Button } from "@mantine/core";

type ButtonProps = {
  variant?: "default" | "filled";
  fullWidth?: boolean;
  disabled?: boolean;
  mt?: "md" | "xl" | "sm" | "lg";
  type?: "button" | "reset" | "submit" | undefined;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  onSubmit?: (value: any) => void;
  leftIcon?: React.ReactNode;
};

export default function Buttons({
  fullWidth,
  disabled,
  children,
  mt,
  type,
  variant = "filled",
  onClick,
  onSubmit,
  isLoading,
  leftIcon,
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      color='cyan'
      size='md'
      radius='md'
      fullWidth={fullWidth}
      disabled={disabled}
      mt={mt}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      loading={isLoading}
      leftIcon={leftIcon}
    >
      {children}
    </Button>
  );
}
