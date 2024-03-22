"use client";
//Import from mantine
import { Title, Container, Image, Flex, Text } from "@mantine/core";
import irmlogo from "../../../public/assets/logo/irmlogo.png";
//React-hook-form import
import { FormProvider, useForm } from "react-hook-form";
//Yup Import
import { yupResolver } from "@hookform/resolvers/yup";
//Component import
import FormGrid from "@/components/FormGrid";
import inputvalues from "@/jsondata/login";
import schema from "@/schema/loginSchema";
import { useEffect, useState } from "react";
//login redux and rtk apiSlice
import { useLoginMutation, useUserCheckMutation } from "@/store/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/store/slice/loginSlice";

//toaster
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import { setCookie } from "@/helper/SessionToken";
import { Page } from "@/store/interface/LoginInterface";

interface clientObj {
  name: string;
  type: string;
  label: string;
  withAsterisk: boolean;
  placeholder: string;
  data: any[];
}

// /******************** Functional Component *********************/

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { accesstoken } = useAppSelector((state) => state.auth);

  const [loginjson, setloginJson] = useState(inputvalues);
  const [active, setActive] = useState(0);
  const [policies, setPolices] = useState<Page[] | undefined>([]);
  const [userName, setUserName] = useState<string>("");

  const [userCheck, { isLoading: isUserCheckLoading, error: userCheckError }] = useUserCheckMutation();
  const [login, { isLoading: isLoginLoading, error: loginError, isSuccess: loginSuccess, data }] = useLoginMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getPolices = () => {
        const datas: Page[] | [] | undefined =
          data?.data?.policies &&
          data?.data?.policies
            .filter((el) => el.CREATEOPS === "1" && el.DELETEOPS === "1" && el.READOPS === "1" && el.UPDATEOPS === "1")
            .map((el) => {
              const child = el?.children?.filter(
                (el1) => el1.CREATEOPS === "1" || el1.DELETEOPS === "1" || el1.READOPS === "1" || el1.UPDATEOPS === "1"
              );
              return el.children ? { ...el, children: child } : { ...el };
            });
        return datas;
      };
      const polices = getPolices();
      polices && localStorage.setItem("polices", JSON.stringify(polices));
      userName.length > 0 && localStorage.setItem("userName", JSON.stringify(userName));
    }
  }, [data?.data?.policies, userName]);

  /* useForm hook is a built-in react-hook-form. We can define initial values of our required fields. We can select mode of form validation and specify default value of every component */
  const methods = useForm({
    mode: "all",
    defaultValues: {},
    /* resolver is used for yup validation */
    resolver: yupResolver(schema[active]),
  });

  const { handleSubmit, formState } = methods;

  /* Submit the value to reducer  */
  const submitHandler = async (value: any) => {
    const clientObj = {
      name: "client",
      type: "dropdown",
      label: "Client",
      withAsterisk: true,
      placeholder: "Enter your Client Name",
    };

    try {
      if (!accesstoken?.value) {
        // console.log(value);
        const userCheckData = await userCheck(value).unwrap();
        setUserName(userCheckData?.userName);
        dispatch(setAccessToken(userCheckData?.accessToken));
        clientDataFetch({
          ...clientObj,
          data: userCheckData?.client.map((item) => ({
            value: item.IRM_CUST_GBL_MST_CUST_ID,
            label: item.IRM_CUST_GBL_MST_CUST_LEGAL_ENTITY_NAME,
          })),
        });
      } else {
        const res = { custId: parseInt(value.client) };
        const loginData = await login(res).unwrap();
        setPolices(loginData.data.policies);
        const adr = [];
        //console.log(loginData.data.policies?.filter((el) => el.children).map((el) => el.children));
        //.toLowerCase().replace(/\s/g, "")
        const loginExpireTimeMatch = loginData.data.accessToken.expiresIn.match(/^(\d+)([a-zA-Z]+)$/);
        if (loginExpireTimeMatch && loginExpireTimeMatch.length > 0) {
          const loginExpireTime = parseInt(loginExpireTimeMatch[0]);
          localStorage.setItem("authToken", loginData.data.accessToken.value)
          setCookie("authToken", loginData.data.accessToken.value, loginExpireTime);
        }
        toast.success(loginData.message, {
          onClose: () => {
            router.push("/irm-dashboard");
          },
        });
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const clientDataFetch = (clientObj: clientObj) => {
    // set user login data
    try {
      setloginJson((oldState) => {
        setActive((current) => (current === 0 ? current + 1 : current));
        let prev = JSON.parse(JSON.stringify(oldState));
        prev.forEach((item: { name: string; disabled: boolean }) => {
          if (item.name !== "client") {
            item.disabled = true;
          } else item.disabled = false;
        });
        return [prev, clientObj];
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container size={480} mt={"10%"}>
      <Flex direction={"column"}>
        <Image maw={60} mx='auto' radius='md' src={irmlogo.src} alt='Random image' />
        <Title align='center' order={2}>
          iRM Cloud / Sign in
        </Title>
        <Text c={"dimmed"} ta='center' mb={"lg"}>
          Enter your username and password to Log in
        </Text>
      </Flex>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <FormGrid
            inputFields={loginjson}
            colsNo={1}
            btn={true}
            disablebtn={!formState.isValid}
            isLoadingBtn={isUserCheckLoading || isLoginLoading || loginSuccess}
          />
        </form>
      </FormProvider>

      {/* <ToastContainer autoClose={1000} /> */}
    </Container>
  );
}
