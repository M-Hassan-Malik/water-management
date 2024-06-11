import "../styles/global.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { Hydrate, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import { Misc } from "@/components";
import { queryClient } from "@/services";

// import { useSelector } from "react-redux";
import store from "../redux/store";

export const InputsContext = createContext({});

const MyApp = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page: any) => page);
  const [inputs, setInputs] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    openOTPRoute: false,
    openNewPassword: false,
  });

  const router = useRouter();

  const getPageTitle = (url: any) => {
    // Extract the page name or title from the URL or use a default title
    const pageName = url.trim().split("/");
    const filteredArray = pageName.filter((item: any) => item !== "");
    if (filteredArray.length > 1) {
      return `${filteredArray[0]} | ${filteredArray[1]}`;
    }
    if (filteredArray.length === 1) {
      return filteredArray[0];
    }
    return "Ellis Docs";
  };

  useEffect(() => {
    // Update the page title when the route changes
    const handleRouteChange = (url: any) => {
      const pageTitle = getPageTitle(url);

      document.title = pageTitle;
    };

    router.events.on("routeChangeComplete", (url) => {
      handleRouteChange(url);
    });

    // Initial page title setup
    // document.title = getPageTitle(router.);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <CookiesProvider>
        <InputsContext.Provider value={{ inputs, setInputs }}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehyderatedState}>
              <Misc.Fonts />
              {getLayout(
                <Component
                  {...pageProps}
                  // toggleTheme={toggleTheme}
                />
              )}
            </Hydrate>
          </QueryClientProvider>
        </InputsContext.Provider>
      </CookiesProvider>
    </Provider>
  );
};

export default MyApp;
