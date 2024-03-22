import { createStyles, rem, useMantineTheme } from "@mantine/core";
import { CheckboxProps } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface MantineCheckbox {
  id?: string;
  name?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  labelFont?: "bodyB4" | "bodyB3";
}

const MantineCheckbox = ({
  id,
  name,
  label,
  description,
  disabled,
  error,
  onChange,
  checked,
  labelFont = "bodyB4",
}: MantineCheckbox) => {
  const useStyles = createStyles((theme) => {
    return {
      main: {
        ".mantine-Checkbox-input": {
          border: `2px solid ${checked ? theme.colors.waterfall[5] : theme.colors.black[1]}`,
          backgroundColor: checked ? theme.colors.waterfall[1] : theme.colors.black[0],
          transition: "all 0.5s ease-out",
          cursor: "pointer",
        },
      },
      label: {
        padding: 0,
        cursor: "pointer",
        color: theme.colors.black[8],
      },
      description: { color: theme.colors.black[8], padding: 0, margin: 0 },
      body: {
        alignItems: "center",
        gap: label ? theme.spacing["s12"] : "",
      },
      labelWrapper: {
        gap: 0,
      },
    };
  });

  const { classes } = useStyles();
  const theme = useMantineTheme();

  const CheckboxIcon: CheckboxProps["icon"] = ({ className }) => (
    <IconCheck className={className} color={theme.colors.waterfall[5]} stroke={5} />
  );

  return (
    <Checkbox
      id={id}
      className={`${classes.main}`}
      classNames={{
        label: `${labelFont} ${classes.label}`,
        description: `labelL2 ${classes.description}`,
        body: classes.body,
        labelWrapper: classes.labelWrapper,
      }}
      name={name}
      label={label}
      description={description}
      disabled={disabled}
      error={error}
      onChange={onChange}
      checked={checked}
      size={rem(24)}
      icon={CheckboxIcon}
    />
  );
};

export default MantineCheckbox;
