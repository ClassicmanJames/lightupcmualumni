import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { Fragment } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import MainLayouts from "@/components/layouts/MainLayouts";
export default function App(
  { Component, pageProps }: AppProps,
  { children }: any
) {
  return (
    <Fragment>
      <Provider store={store}>
        <MainLayouts>
          {children}
          <Component {...pageProps} />
        </MainLayouts>
      </Provider>
    </Fragment>
  );
}
