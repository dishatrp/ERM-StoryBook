import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Layout from "@/layout/layout";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store, { useAppDispatch } from "@/store/store";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { MantineProvider } from "@mantine/core";
import { Store } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Head from "next/head";
import { theme } from "@/styles/globals";
import { useFetchTemplateDataQuery } from "@/store/api/ermNewApiSlice";
import { setTemplateId } from "@/store/slice/TemplateIdSlice";
import useScript from "./useScript";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const SetGlobalData = () => {
  const dispatch = useAppDispatch();
  const { data: fetchedTemplatedata } = useFetchTemplateDataQuery();


  useEffect(() => {
    try {
      if (typeof window !== undefined && window.localStorage.getItem("polices")) {
        const arr = window.localStorage.getItem("polices");
        const policies: any = JSON.parse(arr as string);
        const hasPermission = policies?.some((item: any) => {
          return (item.pageMst_ITEM = "ERM");
        });

        hasPermission && dispatch(setTemplateId(fetchedTemplatedata && +fetchedTemplatedata?.data?.data?.[0]?.ID));
      }
    } catch (error) { }
  }, [dispatch, fetchedTemplatedata]);
  return <></>;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userConsent, setUserConsent] = useState(true);

  useScript(' https://salesiq.zoho.in/widget', 'siq64942afa2bc7c4718a72f4b767aafd4198316e52c2b525c3def319ed2d73157a', userConsent)


  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);
  const arr =
    process.env.NODE_ENV === "production" ? ["login", "Home", "Custom404"] : ["LoginPage", "Home", "Custom404"];
  const isSpecialPage = arr.includes(Component.name);
  // console.log("Component.name", Component.name);

  return (
    <>
      <Head>
        <title>iRM</title>
        <link href='favicon.ico' />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Loader visible={loading} />
        {isSpecialPage ? (
          <Provider store={store}>
            <ToastContainer autoClose={1000} />
            <Component {...pageProps} />
          </Provider>
        ) : (
          <Layout>
            <Provider store={store}>
              <SetGlobalData />
              <ToastContainer autoClose={1000} />
              <Component {...pageProps} />
            </Provider>
          </Layout>
        )}
      </MantineProvider>
    </>
  );
};

const makeStore: MakeStore<Store<Object>> = () => store;
const wrapper = createWrapper(makeStore);

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(App);
