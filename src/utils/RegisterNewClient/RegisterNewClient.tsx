/** @format */
/* React import */
import React, { useEffect } from "react";
import { useState } from "react";
/*Mantine import */
import { Stepper, Container, Text, Flex, rem, Drawer, Group } from "@mantine/core";
/*RHF import */
import { FormProvider, useForm, useWatch } from "react-hook-form";
/*Yup import */
import { yupResolver } from "@hookform/resolvers/yup";
import { moduleSelection, inputField } from "@/jsondata/registerNewClient";
/*Yup schema import  */
import schema from "@/schema/registerNewClientSchema";

/* Components import */
import PageTitle from "@/components/PageTitle";
import FormGrid from "@/components/FormGrid";
import Buttons from "@/components/Button";
import RegisterNewClientButton from "@/components/RegisterNewClient/RegisterNewClientButton";
import { useContructColumn } from "@/components/mantineTable/TableConfigurations";
import {
  addButtonValidationHandler,
  addModuleNameDateRangeHandler,
  labelDescriptionTitleHandler,
  readFileAsDataURL,
  structredData,
  structredEdittedData,
  submitRequest,
} from "./helper";
import {
  useClientMetaDataQuery,
  useGetAllCustomerListQuery,
  useReadSingleClinetMutation,
  useRegisterNewClientMutation,
  useUpdateClientMutation,
} from "@/store/api/clientApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from "./styles";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IconEdit } from "@tabler/icons-react";
import { setImage } from "@/store/slice/imagleSlice";
import Loader from "@/components/Loader";
import ErmTable from "@/components/erm/ermTable/ErmTable";

/******************** Functional Component ********************/

const RegisterNewClient = () => {
  /* This state is used for procedding to the next step of every stepper form. */
  const [active, setActive] = useState(0);

  const [dropDown, setDropDown] = useState(inputField);

  const [validationSchema, setValidationSchema] = useState(schema);

  const [isUpdate, setIsupdate] = useState(false);

  /* This state is used for saving module data as an array. So that we can display module's start date, end date , and module Name to the user in Module. */
  const [moduleNameDateRange, setmoduleNameDateRange] = useState<addModuleDateRangeNameProps[] | [] | moduleProps[]>(
    []
  );

  const [CUST_ID, setCUST_ID] = useState<number>();

  const [open, setOpen] = useState(false);

  const [custLogoStr, setCustLogoStr] = useState<string | undefined>("");

  /* This state is used for disabled the dropdown option which is already selected by the user or which is alreay stored in the moduleNameDateRange array. */
  const [ismoduleNameDropdownDisable, setismoduleNameDropdownDisable] = useState(moduleSelection);

  //  const [image64, setImage64] = useState<string | ArrayBuffer | null>();

  const { data } = useClientMetaDataQuery();
  const [registerNewClient, { isLoading, isSuccess }] = useRegisterNewClientMutation();

  const { isLoading: listLoading, data: listData, refetch } = useGetAllCustomerListQuery("");

  const [readSingleClinet, { isLoading: singleClientLoading }] = useReadSingleClinetMutation();

  const [updateClient, { isLoading: updateLoading }] = useUpdateClientMutation();

  interface Dropdown {
    ID: string;
    ITEM: string;
  }

  /*isLoading  listLoading singleClientLoading singleClientLoading updateLoading*/

  //Fetching metaData
  useEffect(() => {
    setDropDown((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      if (active === 0) {
        setismoduleNameDropdownDisable((prevs) => {
          //console.log("prevsi", prevs);
          let states = JSON.parse(JSON.stringify(prevs));
          const updates = [
            {
              ...states[0],
              data: data?.modules?.map((item: Dropdown, i: number) => {
                return {
                  value: item?.ID,
                  label: item?.ITEM,
                };
              }),
            },
            states[1],
          ];
          return updates;
        });
      }

      if (active <= 5)
        update[active].forEach((el: { id: string; data: { value: string; label: string }[] }) => {
          data?.metaData?.forEach((item: any) => {
            if (item.MASTER_TYPE === el.id) {
              el.data = item?.MST_DTL
                ? item?.MST_DTL.map((el: any) => {
                    return {
                      value: el.MST_DTL_ID,
                      label: el.DESC,
                    };
                  })
                : [];
            }
          });
        });
      return update;
    });
  }, [active, data]);

  /* Types declaration which will used when we take the input of module form input field. And this the type of object that will store inside moduleNameDateRange state. */
  interface addModuleDateRangeNameProps {
    ModuleLicense: string;
    startDate: string;
    endDate: string;
    index: number;
  }

  interface moduleProps extends addModuleDateRangeNameProps {
    ModuleLicenseName: string;
  }

  /* This RHF hook is used for mode of the validation. Taking Yup schema as for validate the input and setting the default value. */
  const methods = useForm({
    mode: "all",
    defaultValues: {
      ModuleLicense: "",
      moduleDate: ["", ""],
    },
    /* taking all yup schema as an array of object and this will keep changing as the active state is changed. */
    resolver: yupResolver(validationSchema[active]),
  });

  /* RHF destructure form useForm hook */
  const { handleSubmit, formState, setValue, control, reset, trigger } = methods;

  //console.log(formState.isValid);

  const checked = useAppSelector((state) => state.checkStatus.checked);

  const { classes } = useStyles();

  /* useWatch hook is used for taking the value from moduleName field in onChnage mode. It is a hook from RHF. It takes the name of the field and gives the value of the field in onChange mode. */
  const ModuleLicense = useWatch({
    control,
    name: "ModuleLicense",
  });

  /* Taking the Value from moduleDate. It return an array of object. */
  const moduleDateRange = useWatch({
    control,
    name: "moduleDate",
  });

  /* Proceed to the next step after clicking to the next button. */
  const nextStep = async () => {
    //console.log("next step");
    await trigger();
    typeof window !== undefined && window.scroll(0, 0);
    setActive((current) => (current < dropDown.length ? current + 1 : current));
  };

  /* Proceed to the prev step after clicking to the Back button.  */
  const prevStep = async () => {
    await trigger();
    setActive((current) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return current >= 1 ? current - 1 : current;
    });
  };

  const dispatch = useAppDispatch();

  /* Submit the data */
  const submitHandler = async (value: any) => {
    //console.log("submit handler");
    try {
      if (value.CustLogo) {
        const file = value.CustLogo;

        if (file) {
          const base64String = await readFileAsDataURL(file);
          const output = await submitRequest(value, checked, base64String, null, moduleNameDateRange, true);

          output.clientDetail.CustomerId === undefined && delete output.clientDetail["CustomerId"];
          //console.log(output);

          const submitData = await registerNewClient(output).unwrap();
          //console.log(submitData);

          toast.success(submitData.message, {
            autoClose: 1000,
          });
          reset();
          setActive(0);
          setmoduleNameDateRange([]);
          // setIsUserUpdate((prev) => prev + 1);
          refetch();
        }
      }
    } catch (error: any) {
      console.log("client", error);
      toast.error(error.message, {
        autoClose: 1000,
      });
    } finally {
      if (!isLoading || !isSuccess) {
      }
    }
  };

  const updateHandler = async (value: any) => {
    try {
      if (value.CustLogo) {
        const file = value.CustLogo;

        if (typeof file === "object" && file.name !== "") {
          const base64String = await readFileAsDataURL(file);

          const updateBody = await submitRequest(value, null, base64String, CUST_ID, moduleNameDateRange, false);
          !updateBody.clientDetail.DataBaseType && delete updateBody.clientDetail["DataBaseType"];
          !updateBody.clientDetail.isActive && delete updateBody.clientDetail["isActive"];
          const updatedData = await updateClient(updateBody).unwrap();
          //console.log(updatedData);
          //console.log("Notelse", updateBody);
          toast.success(updatedData.message, {
            autoClose: 1000,
          });
        } else {
          const str = custLogoStr?.split("/");
          const strName = str && str[str?.length - 1];
          const updateBody = submitRequest(value, null, null, CUST_ID, moduleNameDateRange, false, strName);
          !updateBody.clientDetail.DataBaseType && delete updateBody.clientDetail["DataBaseType"];
          !updateBody.clientDetail.isActive && delete updateBody.clientDetail["isActive"];
          //console.log("elseCondi", updateBody);
          const updatedData = await updateClient(updateBody).unwrap();
          //console.log(updateBody);
          toast.success(updatedData.message, {
            autoClose: 1000,
          });
        }
        reset();
        setActive(0);
        setIsupdate(false);
        setDropDown(inputField);
        setValidationSchema(schema);
        setmoduleNameDateRange([]);
        dispatch(setImage(""));
        // setIsUserUpdate((prev) => prev + 1);
        refetch();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        autoClose: 1000,
      });
    } finally {
    }
  };

  const columns = useContructColumn([
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    { accessorKey: "ModuleLicenseName", header: "Module Name" },
    { accessorKey: "edit", header: "Edit" },
    { accessorKey: "delete", header: "Delete" },
  ]);

  const structuredColumnData = () => {
    return listData?.data?.globalCustomerMaster.map((el) => {
      return {
        USERNAME: el.type,
        edit: (
          <IconEdit
            size={rem(20)}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpen(false);
              editUserData(el.id);
            }}
            className={classes.logoEdit}
          />
        ),
      };
    });
  };

  console.log("structuredData", structuredColumnData());

  const columnUser = useContructColumn([
    {
      accessorKey: "USERNAME",
      header: "User Name",
      accessorFn: (Ui) => {
        return (
          <>
            <Text fw={400} fz={"md"}>
              {Ui.USERNAME}
            </Text>
          </>
        );
      },
    },
    {
      accessorKey: "edit",
      header: "Edit",
    },
  ]);

  const editUserData = async (el: string) => {
    try {
      setCUST_ID(+el);
      setDropDown((prev) => {
        const updated = prev.filter((el) => el[0].name !== "DataBaseType");
        const updated1 = updated[0].filter((item) => item.name !== "isActive");
        return [updated1, updated[1], updated[2], updated[3], updated[4]];
      });
      setIsupdate(true);
      setValidationSchema((schema: any[]) => schema.filter((el: any) => !el.fields.hasOwnProperty("DataBaseType")));
      const editedData = await readSingleClinet({ clientId: el }).unwrap();
      //console.log(editedData);

      const value = Object.entries(structredEdittedData(editedData));
      let tabledata: any;
      value.forEach((el) => {
        if (el[0] === "CustLogo") {
          const bolbContent = "";
          const blob = new Blob([bolbContent], { type: "image/png" });
          const file = new File([blob], "", { type: "image/png" });
          setValue("CustLogo" as any, file);
          //console.log("custlogo", el[1]);
          setCustLogoStr(el[1] as any);
          dispatch(setImage(el[1]));
        } else if (el[0] !== "moduleLicenses")
          setValue(el[0] as any, el[1], {
            shouldTouch: true,
            shouldValidate: true,
            shouldDirty: true,
          });
        else if (el[0] === "moduleLicenses") {
          tabledata = el[1];
          //console.log("table", el);
          const moduleIndex = tabledata.map((item: any, i: number) => ({
            ...item,
            index: i,
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate),
          }));
          //console.log("moduleLicense", moduleIndex);
          setmoduleNameDateRange(moduleIndex);
        }
      });

      const dataR = tabledata.map((el: any) => el.ModuleLicense);
      //console.log("dataR", dataR);
      setismoduleNameDropdownDisable((item) => {
        let data = JSON.parse(JSON.stringify(item));
        data[0].data = data[0].data.map((i: { value: string; label: string; disabled: boolean }) => {
          if (dataR.includes(i.value)) {
            return { ...i, disabled: true };
          } else return i;
        });
        //console.log("result", data, dataR);
        return data;
      });
      toast.success(editedData.message, {
        autoClose: 1000,
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, {
        autoClose: 1000,
      });
    }
  };

  const LoaderComponent = () => {
    return <Loader visible={listLoading || singleClientLoading || singleClientLoading} />;
  };

  return (
    <React.Fragment>
      <Container size={"lg"} mt={"lg"}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(isUpdate ? updateHandler : submitHandler)}>
            <Flex justify='space-between' align='center' mb={rem(30)}>
              <PageTitle> Register New Client</PageTitle>
              <Drawer
                zIndex={9999}
                opened={open}
                onClose={() => {
                  setOpen(false);
                }}
                title='All Users'
                position='right'
                size='xl'
              >
                <Text fz={"sm"} c='dimmed' mb={rem(50)}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, at! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Illo, sint.
                </Text>
                {listData?.data?.globalCustomerMaster && listData?.data?.globalCustomerMaster.length > 0 && (
                  <ErmTable
                    columns={columnUser}
                    //data={structuredColumnData()}
                    otherTableConfigurations={{
                      layoutMode: "semantic",
                      enableTopToolbar: false,
                    }}
                    data={structuredColumnData() || []}
                  />
                )}
              </Drawer>
              <Group position='center' mb={rem(20)}>
                <Buttons
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Clients
                </Buttons>
              </Group>
            </Flex>
            <LoaderComponent />
            <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={formState.isValid}>
              {/* Looping over the array of input Field Object */}
              {dropDown.map((el, i) => {
                return (
                  <Stepper.Step
                    label={labelDescriptionTitleHandler(el)?.label}
                    description={labelDescriptionTitleHandler(el)?.description}
                    key={i}
                  >
                    <Container size={"lg"}>
                      <PageTitle mt={"lg"}>{labelDescriptionTitleHandler(el)?.label}</PageTitle>
                      <Text mb={"md"} className={classes.root} italic={true}>
                        {labelDescriptionTitleHandler(el)?.title}
                      </Text>

                      <FormGrid
                        key={active}
                        inputFields={
                          labelDescriptionTitleHandler(el)?.label === "Module" ? ismoduleNameDropdownDisable : el
                        }
                        btn={false}
                        colsNo={2}
                        disablebtn={false}
                      >
                        {labelDescriptionTitleHandler(el)?.label === "Module" ? (
                          <React.Fragment>
                            <Buttons
                              onClick={() =>
                                addModuleNameDateRangeHandler(
                                  setmoduleNameDateRange,
                                  setValue,
                                  setismoduleNameDropdownDisable,
                                  ModuleLicense,
                                  moduleDateRange,
                                  data
                                )
                              }
                              type='button'
                              mt={"lg"}
                              disabled={addButtonValidationHandler(ModuleLicense, moduleDateRange)}
                            >
                              Add
                            </Buttons>
                            <Container size={"lg"} mt={"lg"}>
                              {moduleNameDateRange.length > 0 && (
                                <ErmTable
                                  columns={columns}
                                  data={structredData(
                                    moduleNameDateRange,
                                    setValue,
                                    setmoduleNameDateRange,
                                    setismoduleNameDropdownDisable,
                                    classes
                                  )}
                                  otherTableConfigurations={{
                                    layoutMode: "semantic",
                                    enableTopToolbar: false,
                                  }}
                                />
                              )}
                            </Container>
                            <RegisterNewClientButton
                              onSubmitHandler={submitHandler}
                              onclickPrev={prevStep}
                              type='submit'
                              disabled={moduleNameDateRange?.length > 0 ? false : true}
                              isLoading={isLoading || updateLoading}
                            />
                          </React.Fragment>
                        ) : (
                          <RegisterNewClientButton
                            onClickNext={nextStep}
                            onclickPrev={prevStep}
                            type='button'
                            disabled={!formState.isValid}
                          />
                        )}
                      </FormGrid>
                    </Container>
                  </Stepper.Step>
                );
              })}

              <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
            </Stepper>
          </form>
        </FormProvider>
        {/* <ToastContainer /> */}
      </Container>
    </React.Fragment>
  );
};

export default RegisterNewClient;
