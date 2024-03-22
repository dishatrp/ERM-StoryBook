import { Switch, createStyles, rem } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

/* Type declared for props passed inside DateInputs component */
type SwitchInputProps = {
  label?: string;
  description?: string;
  disabled?: boolean;
  name: string;
  onLabel?: string;
  offLabel?: string;
};

const useStyles = createStyles(() => ({
  wrapper: {
    marginBottom: '5px',
  },
}));

const Switchs = ({
  /* Props of functions */
  label,
  disabled,
  name,
  onLabel,
  offLabel,
}: SwitchInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { classes } = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          classNames={{
            labelWrapper: classes.wrapper,
          }}
          // functionality props
          {...field}
          // Error coming from RHF
          error={errors[name]?.message as React.ReactNode}
          //Default props
          label={label}
          onLabel={onLabel}
          offLabel={offLabel}
          id={name}
          disabled={disabled || false}
          size='lg'
        />
      )}
    />
  );
};

export default Switchs;
