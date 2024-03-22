/** @format */

/* Mantine import */
import { Center, FileInput, FileInputProps, Group, rem, Flex } from "@mantine/core";
import { Image } from "@mantine/core";

/*Icon import  */
import { IconPhoto } from "@tabler/icons-react";
import placeHolder from "/public/assets/placeholder/logoPlaceholder.jpg";

/*React-hook-form import */
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { InputPorps } from "../interface/InputFieldInterface";
import { useStyles } from "./styles";
import { useAppSelector } from "@/store/store";

/* Type declared for props passed inside FileUpload component  */
interface MultiSelectProps extends InputPorps {
  accept?: string;
  image?: string;
}

/* This function returns a component that put inside the logo   */
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

/******************** Functional Component ********************/
const FileUpload = ({
  /* Props of functions */
  placeholder,
  label,
  withAsterisk,
  description,
  disabled,
  name,
  accept,
}: MultiSelectProps) => {
  /* function starts here */

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { classes } = useStyles();

  const imageValue = useWatch({
    control,
    name: name,
  });

  const imageState = useAppSelector((state) => state.imageStatus.imageValue);

  const getImage = (data: string) => {
    if (typeof imageValue === "object") {
      return URL.createObjectURL(imageValue);
    } else {
      return data;
    }
  };

  const getImageValue = () => {
    if (typeof imageValue === "object" && imageValue?.name === "") {
      // console.log("run from", imageValue);
      return false;
    } else {
      return imageValue;
    }
  };

  return (
    <div className={accept === "image/png, image/jpeg" ? classes.container : ""}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => {
          return (
            <FileInput
              classNames={{
                root: classes.root,
                wrapper: classes.wrapper,
                //   error: classes.error,
              }}
              // functionality props
              {...field}
              //Error comming from RHF
              error={errors[name]?.message as React.ReactNode}
              //Default props
              label={label}
              id={name}
              placeholder={placeholder}
              withAsterisk={withAsterisk || true}
              disabled={disabled || false}
              description={description}
              accept={accept}
              valueComponent={ValueComponent}
              clearable
              style={{ width: "100%" }}
            />
          );
        }}
      />
      {accept === "image/png, image/jpeg" && (
        <Flex justify={"center"} align={"center"}>
          {getImageValue() ? (
            <Image src={getImage(imageValue)} alt='image' width={60} height={60} className={classes.logo} />
          ) : (
            <Image
              src={imageState.length > 0 ? imageState : placeHolder.src}
              alt='logo'
              width={60}
              height={60}
              className={classes.logo}
            />
          )}
        </Flex>
      )}
    </div>
  );
};

export default FileUpload;
