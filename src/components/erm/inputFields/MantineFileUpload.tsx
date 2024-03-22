import { Center, FileInput, FileInputProps, Group, rem, Flex, Tooltip, useMantineTheme } from "@mantine/core";
import { Image } from "@mantine/core";

/*Icon import  */
import { IconCircle, IconInfoCircle, IconPhoto, IconUpload } from "@tabler/icons-react";
import placeHolder from "/public/assets/placeholder/logoPlaceholder.jpg";

/*React-hook-form import */
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { InputFieldPorps } from "./InputInterface";

import { useAppSelector } from "@/store/store";
import { useStyles } from "./Styles";
import { formatName } from "./StringInput";
import { ReactNode } from "react";

interface MultiSelectProps {
  placeholder?: string;
  label?: ReactNode;
  disabled?: boolean;
  name: string;
  error?: string;
  max?: number;
  min?: number;
  tooltip: string;
  data?: any;
  searchable?: boolean;
  id?: string;
  accept?: string;
  image?: string;
  description?: string;
  controller?: boolean;
  onChange?: (event: any) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: File | null;
}

function Value({ file }: { file: File }) {
  const imageState = useAppSelector((state) => state.imageStatus.imageValue);
  const setImage = imageState.split("/");
  return (
    <Center
      inline
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
        fontSize: theme.fontSizes.xs,
        padding: `${rem(3)} ${rem(7)}`,
        borderRadius: theme.radius.sm,
      })}
    >
      <IconPhoto size={rem(14)} style={{ marginRight: rem(5) }} />
      <span
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxWidth: rem(200),
          display: "inline-block",
        }}
      >
        {file.name || setImage[setImage.length - 1]}
      </span>
    </Center>
  );
}

const ValueComponent: FileInputProps["valueComponent"] = ({ value }: { value: any }) => {
  if (Array.isArray(value)) {
    return (
      <Group spacing='sm' py='xs'>
        {value.map((file, index) => (
          <Value file={file} key={index} />
        ))}
      </Group>
    );
  }

  return <Value file={value} />;
};

const MantineFileUpload = ({
  /* Props of functions */
  placeholder,
  label,
  tooltip,
  disabled,
  name,
  accept,
  description,
  controller = true,
  error,
  onChange,
  value
}: MultiSelectProps) => {
  const form = useFormContext();

  const { classes } = useStyles();
  const theme = useMantineTheme();

  if (!controller)
    return (
      <FileInput
        classNames={{
          root: classes.root,
          wrapper: classes.wrapper,
          error: classes.error,
          input: classes.input,
          label: `${classes.label} labelL1`,
          description: classes.description,
        }}
        error={error}
        description={description}
        label={
          <>
            {label}
            <Tooltip
              zIndex={9999999}
              position='top'
              label={tooltip || false}
              classNames={{
                tooltip: `${classes.tooltip} labelL3`,
              }}
            >
              <IconInfoCircle color={theme.colors.black[1]} size={16} />
            </Tooltip>
          </>
        }
        id={name}
        placeholder={placeholder}
        disabled={disabled || false}
        accept={accept}
        valueComponent={ValueComponent}
        clearable
        value={value}
        onChange={onChange}
        rightSection={<IconUpload color={theme.colors.black[1]} size={"24px"} />}
      />
    );

  return (
    <Controller
      name={name}
      control={form?.control}
      rules={{
        required: {
          value: true,
          message: `${label} is a required field`,
        },
      }}
      defaultValue={null}
      render={({ field }) => {
        return (
          <FileInput
            classNames={{
              root: classes.root,
              wrapper: classes.wrapper,
              error: classes.error,
              input: classes.input,
              label: `${classes.label} labelL1`,
              description: classes.description,
            }}
            // functionality props
            {...field}
            //Error comming from RHF
            error={formatName(name, form?.formState?.errors)}
            //Default props
            description={description}
            label={
              <>
                {label}
                <Tooltip
                  zIndex={9999999}
                  position='top'
                  label={tooltip || false}
                  classNames={{
                    tooltip: `${classes.tooltip} labelL3`,
                  }}
                >
                  <IconInfoCircle color={theme.colors.black[1]} size={16} />
                </Tooltip>
              </>
            }
            id={name}
            placeholder={placeholder}
            disabled={disabled || false}
            accept={accept}
            valueComponent={ValueComponent}
            clearable
            rightSection={<IconUpload color={theme.colors.black[1]} size={"24px"} />}
          />
        );
      }}
    />
  );
};

export default MantineFileUpload;
