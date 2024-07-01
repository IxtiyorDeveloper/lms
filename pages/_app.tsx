import "styles/globals.css";
import "styles/style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "react-phone-number-input/style.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { IStore, store } from "store";
import React from "react";
import theme from "styles/theme";
import { css, Global } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useAuth } from "hooks";
import { CookiesProvider } from "react-cookie";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "styles/style.css";

const ProSidebarProvider = dynamic(
  () => import("components/sidebar/components/ProSidebarProvider")
);
const MainHeadWithTitle = dynamic(() => import("components/common/head"));
const AppFrame = dynamic(() => import("components/appFrame/container"));
const GlobalComponents = dynamic(() => import("../globals"), { ssr: false });
const SyncStoragePersister = dynamic(() => import("../components/persist"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 86400,
    },
  },
});

const Switch = ({ Component, pageProps }: AppProps) => {
  const [user] = useAuth();
  const router = useRouter();
  const isLoading = useSelector((state: IStore) => state.user.isLoading);

  if (isLoading) {
    return null;
  }

  return user ? (
    router.pathname === "/sip" ? (
      <Component {...pageProps} />
    ) : (
      <ProSidebarProvider>
        <AppFrame theme={theme}>
          <MainHeadWithTitle
            title={router.pathname.split("/")[1].toUpperCase()}
          />
          <Component {...pageProps} />
        </AppFrame>
      </ProSidebarProvider>
    )
  ) : (
    <Component {...pageProps} />
  );
};

function App({ Component, pageProps, ...args }: AppProps) {
  return (
    <SyncStoragePersister client={queryClient}>
      <ToastContainer autoClose={1000} />
      <Provider store={store}>
        <CookiesProvider>
          <GlobalComponents>
            <Switch Component={Component} pageProps={pageProps} {...args} />
          </GlobalComponents>
        </CookiesProvider>
      </Provider>
      <CssBaseline />
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

          body {
            font-family: Inter, sans-serif !important;
          }
        `}
      />
    </SyncStoragePersister>
  );
}

export default App;
