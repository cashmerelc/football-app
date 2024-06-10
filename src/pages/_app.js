// import "@/styles/globals.css";
import Layout from "../components/Layout/Layout.js";
import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    const performSync = async () => {
      try {
        const response = await fetch("/api/sync");
        if (!response.ok) {
          throw new Error("Failed to sync data");
        }
        const data = await response.json();
        console.log("Sync completed successfully: ", data);
      } catch (err) {
        console.error("Error during sync: ", err);
      }
    };

    // performSync();
  }, []);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
