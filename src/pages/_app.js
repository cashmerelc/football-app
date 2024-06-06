import "@/styles/globals.css";
import Layout from "../components/Layout/Layout.js";
import React from "react";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
