import { Phase } from "@/store/interface/ErmNewInterface";
import { Flex, Paper, SimpleGrid, createStyles, useMantineTheme } from "@mantine/core";
import { Fragment, ReactNode } from "react";
import StringInput from "../inputFields/StringInput";
import NumberInput from "../inputFields/NumberInput";
import DateInput from "../inputFields/DateInput";
import MantineFileUpload from "../inputFields/MantineFileUpload";
import SelectInput from "../inputFields/SelectInput";

interface FormWrapper {
  formElements: Phase[];
  btns?: ReactNode;
  makePortion?: "ON" | "OFF";
}

const constructFormElements = (item: any) => {
  
  switch (item.DATA_TYPE) {
    case "TEXT":
      return (
        <StringInput
          name={item.INPUT_FIELD || ""}
          label={item.NAME}
          placeholder={item.PLACE_HOLDER || ""}
          tooltip={"No special characters are allowed"}
        />
      );
    case "NUMBER":
      return (
        <NumberInput
          name={item.INPUT_FIELD || ""}
          label={item.NAME}
          placeholder={item.PLACE_HOLDER || ""}
          tooltip={"No special characters are allowed"}
        />
      );
    case "DATE":
      return (
        <DateInput
          name={item.INPUT_FIELD || ""}
          label={item.NAME}
          placeholder={item.PLACE_HOLDER || ""}
          tooltip={"Only date allowed"}
        />
      );
    case "SELECT":
      return (
        <SelectInput
          name={item.INPUT_FIELD || ""}
          label={item.NAME}
          placeholder={item.PLACE_HOLDER || ""}
          data={[...item?.Dropdata] || []}
          onChange={(value) => item.onChange?.(value, item.INPUT_FIELD)}
          tooltip={item.NAME}
          // controller={false}
        />
      );
    // case "TEXT_AREA":
    //   return (
    //     <TextAreaInput
    //       name={item.INPUT_FIELD || ""}
    //       label={item.NAME}
    //       placeholder={item.PLACE_HOLDER || ""}
    //       tooltip={"Only text are allowed"}
    //     />
    //   );
    case "FILE":
      return (
        <MantineFileUpload
          name={item.INPUT_FIELD || ""}
          label={item.NAME}
          placeholder={item.PLACE_HOLDER || ""}
          tooltip={"Only file are allowed"}
          accept='.pdf, .csv, image/jpg, image/png, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        />
      );
    default:
      return (
        <StringInput
          name={item.INPUT_FIELD || ""}
          label={item.NAME}
          placeholder={item.PLACE_HOLDER || ""}
          tooltip={"No special characters are allowed"}
        />
      );
  }
};

const createPortion = (formElements: Phase[]) => {
  return {
    FIRST_PORTION: formElements.slice(0, Math.trunc((formElements.length + 1) / 2)),
    SECOND_PORTION: formElements.slice(Math.trunc((formElements.length + 1) / 2), formElements.length),
  };
};

const useFormWrapper = ({ formElements, makePortion = "ON" }: FormWrapper) => {
  const { FIRST_PORTION, SECOND_PORTION } = createPortion(formElements);
  const { classes } = createStyles((theme) => {
    return {
      fromStyles: {
        padding: makePortion === "ON" ? theme.spacing["s20"] : theme.spacing["s6"],
        borderRadius: makePortion === "ON" ? theme.spacing["s16"] : theme.spacing["s12"],
        backgroundColor: theme.colors.gray[1],
      },
      innerDiv: {
        padding: theme.spacing["s20"],
        borderRadius: makePortion === "ON" ? theme.spacing["s16"] : theme.spacing["s12"],
        backgroundColor: theme.colors.gray["0"],
      },
    };
  })();
  const theme = useMantineTheme();

  return {
    form: (
      <>
        <Paper className={classes.fromStyles} mih={500}>
          <SimpleGrid
            cols={makePortion === "ON" ? 2 : 1}
            spacing={theme.spacing["s16"]}
            verticalSpacing={theme.spacing["s16"]}
          >
            {formElements.length > 0 && makePortion === "ON" && (
              <>
                {FIRST_PORTION.length > 0 && (
                  <Flex direction={"column"} w={"100%"} className={classes.innerDiv} gap={theme.spacing["s16"]}>
                    {FIRST_PORTION?.map((item: Phase, idx: number) => {
                      return <Fragment key={idx}>{constructFormElements(item)}</Fragment>;
                    })}
                  </Flex>
                )}
                {SECOND_PORTION.length > 0 && (
                  <Flex direction={"column"} w={"100%"} className={classes.innerDiv} gap={theme.spacing["s16"]}>
                    {SECOND_PORTION?.map((item: Phase, idx: number) => {
                      return <Fragment key={idx}>{constructFormElements(item)}</Fragment>;
                    })}
                  </Flex>
                )}
              </>
            )}
            {formElements.length > 0 && makePortion === "OFF" && (
              <>
                <Flex direction={"column"} w={"100%"} className={classes.innerDiv} gap={theme.spacing["s16"]}>
                  {[...FIRST_PORTION, ...SECOND_PORTION]?.map((item: Phase, idx: number) => {
                    return <Fragment key={idx}>{constructFormElements(item)}</Fragment>;
                  })}
                </Flex>
              </>
            )}
          </SimpleGrid>
        </Paper>
      </>
    ),
  };
};

export default useFormWrapper;
