//components
import FormGrid, { InputFieldsProps } from "@/components/FormGrid";
import PageTitle from "@/components/PageTitle";
//RHF import
import { FormProvider, Resolver, useForm, useWatch } from "react-hook-form";
//Yup import
import { yupResolver } from "@hookform/resolvers/yup";
//Mantine import
import { Container, Drawer, Flex, Group, rem, Stepper, Text, Title } from "@mantine/core";
//Yup schema import
import { createNewUserSchema } from "@/schema/index";
//Input field
import { CreateNewUserinputField } from "@/jsondata/index";
import { useEffect, useState } from "react";
import {
  useCreateNewUserMutation,
  useEditSingleUserMutation,
  usePermissionNameMutation,
  useTotalUsersQuery,
  useUpdateUserMutation,
} from "@/store/api/createNewUserApiSlice";
//toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buttons from "@/components/Button";
import { useContructColumn } from "@/components/mantineTable/TableConfigurations";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useStyles } from "./style";
import moment from "moment";
import { useGetAllCustomerListQuery } from "@/store/api/clientApiSlice";
import Loader from "@/components/Loader";
import { findUniqueElements, findUniqueElements2 } from "./helper";
import RegisterNewClientButton from "@/components/RegisterNewClient/RegisterNewClientButton";
import { AnyObject, ObjectSchema } from "yup";
import ErmTable from "@/components/erm/ermTable/ErmTable";

/******************** Functional Component ********************/
const CreateNewUser = () => {
  const [validation, setValidation] = useState(createNewUserSchema);

  const [isUpdate, setIsUpdate] = useState(false);

  const [dropDown, setDropDown] = useState(CreateNewUserinputField);

  const [listDatas, setListDatas] = useState(1);

  const [userId, setUserId] = useState<number>();

  const [active, setActive] = useState(0);

  interface FormData {
    userFName: string | any;
    userLName: string | any;
    userEmail: string | any;
    userContactNumber: string | any;
    password: string | any;
    passwordConfirm: string | any;
    userName: string | any;
    endDate: Date | any;
    clientId?: string | any;
    policyId?: string | any;
    resolver?: Resolver<any, any> | undefined;
  }

  /* useFrom is used  from RHF. We can select mode of form validation and specify default value of every component. We can define initial values of our required fields*/
  const methods = useForm<any>({
    mode: "all",
    /* resolver is used for yup validation */
    resolver: yupResolver(validation[active]),
  });

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  interface PermissionObj {
    clientId: string | undefined;
    policyId: string;
    policyName: string;
    clientName: string | undefined;
    index: number;
  }

  const { handleSubmit, formState, setValue, control, reset } = methods;
  const [permissionIds, setPermissionIds] = useState<PermissionObj[] | []>([]);

  const [createNewUser, { isLoading, isSuccess }] = useCreateNewUserMutation();

  const [open, setOpen] = useState(false);

  const { data: listUser, isLoading: listUserLoading, refetch } = useTotalUsersQuery("");

  const { data: listData, isLoading: customerLoading } = useGetAllCustomerListQuery("");

  const [editSingleUser, { isLoading: singleUserLoading }] = useEditSingleUserMutation();

  const [permissionName, { isLoading: permissionLoading }] = usePermissionNameMutation();

  const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();

  useEffect(() => {
    try {
      setDropDown((prev) => {
        const dropdownClientData = listData?.data.globalCustomerMaster.map((el) => {
          return {
            value: `${el.id},${el.type}`,
            label: el.type,
          };
        });
        let update = JSON.parse(JSON.stringify(prev));
        update[1]?.forEach((el: any) => {
          if (el.name === "clientId") {
            el.data = dropdownClientData || [];
          }
        });
        return update;
      });
    } catch (error) {
      console.log(error);
    }
  }, [listData?.data.globalCustomerMaster, listDatas]);

  const changes = useWatch<any>({
    control,
    name: "clientId",
  });

  const permissionId = useWatch<any>({
    control,
    name: "policyId",
  });

  useEffect(() => {
    try {
      const chnageHandler = async () => {
        try {
          if (!changes) return;
          if (Array.isArray(changes)) return;
          let id = "";
          let type = "";
          if (typeof changes === "string") {
            const [ids, types] = changes?.split(",");
            id = ids;
            type = types;
          }
          const ert = await permissionName({ CUST_ID: +id }).unwrap();
          setDropDown((prev) => {
            const dropdownClientData = ert?.data?.permissionNameData?.map((el) => {
              return {
                value: `${el.ID},${el.CUST_ID},${el.POLICY_NAME},${type}`,
                label: el.POLICY_NAME,
              };
            });
            let update = JSON.parse(JSON.stringify(prev));
            update[1]?.forEach((el: any) => {
              if (el.name === "policyId") {
                el.data = dropdownClientData;
              }
            });
            return update;
          });
        } catch (error) {
          console.log(error);
          setDropDown((prev) => {
            let update = JSON.parse(JSON.stringify(prev));
            update[1]?.forEach((el: any) => {
              if (el.name === "policyId") {
                el.data = [{ value: null, label: "No Policy Found", disabled: true }];
              }
            });
            return update;
          });
        } finally {
          setValue("policyId", "");
        }
      };
      chnageHandler();
    } catch (error) {
      console.log(error);
    }
  }, [changes, permissionName, setValue]);

  const formattedTable = () => {
    return permissionIds.map((el) => {
      return {
        ClientName: el.clientName,
        PolicyName: el.policyName,
        policyID: el.policyId,
        clientId: el.clientId,
        delete: (
          <IconTrash
            // style={{ cursor: "pointer" }}
            onClick={() => deleteHandler(el.index)}
            className={classes.logoDelete}
          />
        ),
      };
    });
  };

  const addPermissions = () => {
    //console.log("chnages", changes);
    return setPermissionIds((prev) => {
      if (!permissionId) return prev;
      const update = JSON.parse(JSON.stringify(prev));
      const updatedArr = [...update, permissionId];
      const uniqueArr = findUniqueElements(updatedArr);
      //console.log(uniqueArr, "uniqueAee");
      setDropDown((prevs) => {
        let update = JSON.parse(JSON.stringify(prevs));
        update[1][0]?.data?.forEach((item: { label: string; value: string }, idx: string | number) => {
          if (item.value === changes) {
            update[1][0].data[idx].disabled = true;
          }
        });
        return update;
      });
      const shapedData = uniqueArr.map((el: string, i: number) => {
        const [policyId, clientId, policyName, clientName] = el.split(",");
        return {
          policyId,
          clientId,
          policyName,
          clientName,
          index: i,
        };
      });
      setValue("clientId", "");
      setValue("policyId", "");
      return shapedData;
    });
  };

  /* Submit the value to reducer  */
  const submitHandler = async (value: any) => {
    try {
      const { endDate, policyId, passwordConfirm, ...item } = value;
      let clientId: any[] = [];
      let clientwithpolicy: {
        clientId: string | undefined;
        policyId: string;
      }[] = [];
      permissionIds.forEach((el) => {
        const clientwithpolicys = {
          clientId: el.clientId,
          policyId: el.policyId,
        };

        clientwithpolicy.push(clientwithpolicys);
        clientId.push(el?.clientId);
      });
      const output = {
        ...item,
        clientId: findUniqueElements2(clientId),
        clientwithpolicy: clientwithpolicy,
        endDate: moment(endDate).format("YYYY-MM-DD"),
      };
      //console.log("output", output);
      const postuserData = await createNewUser(output).unwrap();
      //console.log("isSuccess Data", isSuccess);
      if (!postuserData.status) {
        toast.error(postuserData.message, {
          autoClose: 1000,
        });
      } else {
        toast.success(postuserData.message, {
          autoClose: 1000,
        });
      }
      reset();
      setDropDown(CreateNewUserinputField);
      setPermissionIds([]);
      setActive(0);
      refetch();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        autoClose: 1000,
      });
    }
  };

  interface UserDetails {
    userName: string;
    userFName: string;
    userLName: string;
    userEmail: string;
    userContactNumber: string;
    endDate: Date | any;
    clientId: string[];
    clientwithpolicy: {
      CUST_ID: string;
      POLICY_ID: string;
      POLICY_NAME: string;
    }[];
  }

  const editUserData = async (el: string) => {
    try {
      setIsUpdate(true);
      setUserId(+el);
      setValidation((prev: ObjectSchema<{}, AnyObject, {}, "">[]) => {
        if (
          prev[0].fields &&
          prev[0].fields.hasOwnProperty("password") &&
          prev[0].fields.hasOwnProperty("passwordConfirm")
        ) {
          // delete prev[0].fields["password"];
          // delete prev[0]?.fields["passwordConfirm"];
          const fields = prev[0].fields as Record<string, unknown>;
          if ("password" in fields) {
            delete fields["password"];
          }
          if ("passwordConfirm" in fields) {
            delete fields["passwordConfirm"];
          }
        }
        return prev;
      });
      setDropDown((prev) => {
        const pervs = prev[0].filter((el) => el.type !== "password");
        return [pervs, prev[1]];
      });
      const submitData = await editSingleUser({ userId: el }).unwrap();
      const data: UserDetails = submitData?.data?.userDetails;
      //console.log("object", data);
      for (let key in data) {
        if (key === "endDate") {
          setValue("endDate", new Date(data[key]), {
            shouldTouch: true,
            shouldValidate: true,
            shouldDirty: true,
          });
        } else if (key === "clientwithpolicy") {
          const ids = data[key].map((el) => `${el.POLICY_ID},${el.CUST_ID},${el.POLICY_NAME}`);
          const shapedData = ids.map((el, i) => {
            const [policyId, custId, policyName] = el.split(",");
            const data = listData?.data.globalCustomerMaster.find((el) => el.id === custId);
            //console.log("hsw", `${custId},${data?.type}`);
            return {
              clientId: data?.id,
              policyId: policyId,
              policyName: policyName,
              clientName: data?.type,
              index: i,
            };
          });
          //console.log("id", shapedData);

          setPermissionIds(shapedData);
          shapedData.forEach((el) => {
            setDropDown((prevs) => {
              let update = JSON.parse(JSON.stringify(prevs));
              update[1][0]?.data?.forEach((item: { label: string; value: string }, idx: string | number) => {
                if (item.value === `${el.clientId},${el.clientName}`) {
                  update[1][0].data[idx].disabled = true;
                }
              });
              return update;
            });
          });
        } else {
          const validKey = key as keyof UserDetails; // Type assertion
          if (validKey !== "clientId") {
            setValue(validKey, data[validKey], {
              shouldTouch: true,
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }
      }
      setActive(0);
      toast.success(submitData.message, {
        autoClose: 1000,
      });
    } catch (errors: any) {
      console.log(errors);
      toast.error(errors?.message, {
        autoClose: 1000,
      });
    }
  };

  const columns = useContructColumn([
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
      accessorKey: "USEREMAIL",
      header: "Email",
      accessorFn: (Ui) => {
        return (
          <>
            <Text fw={400} fz={"md"}>
              {Ui.USEREMAIL}
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

  const { classes } = useStyles();

  const structuredData = () => {
    return listUser?.data?.users.map((el) => {
      return {
        USERNAME: el.APP_USERNAME,
        USEREMAIL: el.USER_EMAIL,
        edit: (
          <IconEdit
            size={rem(20)}
            // style={{ cursor: "pointer" }}
            onClick={() => {
              setOpen(false);
              editUserData(el.IRM_USER_ID);
            }}
            className={classes.logoEdit}
          />
        ),
      };
    });
  };

  const updateHandler = async (value: any) => {
    try {
      const { endDate, policyId, password, passwordConfirm, ...item } = value;
      let clientId: number[] = [];
      let clientwithpolicy: { clientId: number; policyId: number }[] = [];
      permissionIds.forEach((el) => {
        const clientwithpolicys = {
          clientId: Number(el?.clientId),
          policyId: +el?.policyId,
        };

        clientwithpolicy.push(clientwithpolicys);
        clientId.push(Number(el.clientId));
      });
      const output = {
        ...item,
        id: userId,
        clientId: findUniqueElements2(clientId),
        clientwithpolicy: clientwithpolicy,
        endDate: moment(endDate).format("YYYY-MM-DD"),
      };
      const UpdateUserdata = await updateUser(output).unwrap();
      toast.success(UpdateUserdata.message, {
        autoClose: 1000,
      });
      reset();
      setIsUpdate(false);
      setDropDown(CreateNewUserinputField);
      setValidation(createNewUserSchema);
      setPermissionIds([]);
      setActive(0);
      //setUserList((prev) => prev + 1);
      refetch();
      setListDatas((prev) => prev + 1);
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 1000,
      });
    }
  };

  const permissionColumns = useContructColumn([
    {
      accessorKey: "ClientName",
      header: "Client Name",
    },
    {
      accessorKey: "PolicyName",
      header: "Policy Name",
    },
    { accessorKey: "delete", header: "Delete" },
  ]);

  const deleteHandler = (arg: number) => {
    return setPermissionIds((el) => {
      const data = el.filter((item) => item.index === arg);
      // console.log(
      //   el.filter((item) => item.index === arg),
      //   "dwdwd"
      // );
      setDropDown((prevs) => {
        let update = JSON.parse(JSON.stringify(prevs));
        update[1][0]?.data?.forEach((item: { label: string; value: string }, idx: string | number) => {
          if (item.value === `${data[0].clientId},${data[0].clientName}`) {
            update[1][0].data[idx].disabled = false;
          }
        });
        return update;
      });
      return el.filter((item) => item.index !== arg);
    });
  };

  const LoaderComponent = () => {
    return <Loader visible={listUserLoading || customerLoading || singleUserLoading || permissionLoading} />;
  };

  const labelAndTitleDecicder = (el: InputFieldsProps[]) => {
    if (el.length > 3) {
      return {
        label: "General",
        description: "STEP 1",
        title: "Provide your general information to continue",
      };
    } else {
      return {
        label: "Permission Selection",
        description: "STEP 2",
        title: "Select permission policy",
      };
    }
  };

  return (
    <Container size='lg'>
      <Flex align={"center"} justify={"space-between"}>
        <PageTitle mb={rem(20)}>Create New User</PageTitle>
        <>
          <Drawer
            opened={open}
            onClose={() => {
              setOpen(false);
            }}
            title={""}
            position='right'
            size='xl'
            zIndex={100000000}
          >
            <PageTitle mt={rem(2)}>List of All Users</PageTitle>
            <Text fz={"sm"} c='dimmed' mb={rem(50)} fw={400}>
              This is a list of users. Click on the edit button for edit users.
            </Text>
            {listUser?.data?.users && listUser?.data?.users?.length > 0 && (
              <ErmTable
                columns={columns}
                data={structuredData() || []}
                otherTableConfigurations={{
                  layoutMode: "semantic",
                  enableTopToolbar: false,
                }}
              />
            )}
          </Drawer>
          <Group position='center' mb={rem(20)}>
            <Buttons
              onClick={() => {
                setOpen(true);
              }}
            >
              Users
            </Buttons>
          </Group>
        </>
      </Flex>
      <LoaderComponent />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(isUpdate ? updateHandler : submitHandler)}>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint='sm'
            //allowNextStepsSelect={formState.isValid}
          >
            {dropDown.map((inputField, i) => (
              <Stepper.Step
                key={i}
                label={labelAndTitleDecicder(inputField).label}
                description={labelAndTitleDecicder(inputField).description}
              >
                <div>
                  <PageTitle>{labelAndTitleDecicder(inputField).label}</PageTitle>
                  <Text mb={"md"} className={classes.root} italic={true}>
                    {labelAndTitleDecicder(inputField)?.title}
                  </Text>
                </div>
                <FormGrid
                  inputFields={inputField}
                  colsNo={2}
                  btn={false}
                  disablebtn={false}
                  isLoadingBtn={isLoading || isSuccess || isLoading || updateUserLoading}
                >
                  {inputField.length === 2 ? (
                    <>
                      <Buttons mt='lg' disabled={!changes || !permissionId} onClick={addPermissions}>
                        ADD
                      </Buttons>

                      {permissionIds.length > 0 && (
                        <div className={classes.radious}>
                          <ErmTable
                            columns={permissionColumns}
                            data={formattedTable()}
                            otherTableConfigurations={{
                              layoutMode: "semantic",
                              enableTopToolbar: false,
                            }}
                          />
                        </div>
                      )}

                      <RegisterNewClientButton
                        onSubmitHandler={submitHandler}
                        onclickPrev={prevStep}
                        type='submit'
                        disabled={permissionIds.length === 0}
                        isLoading={updateUserLoading || isLoading}
                      />
                    </>
                  ) : (
                    <RegisterNewClientButton
                      onClickNext={nextStep}
                      onclickPrev={prevStep}
                      type='button'
                      disabled={!formState.isValid}
                    />
                  )}
                </FormGrid>
              </Stepper.Step>
            ))}
          </Stepper>
        </form>
      </FormProvider>
      {/* <ToastContainer /> */}
    </Container>
  );
};

export default CreateNewUser;
