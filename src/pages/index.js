import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import MyLeague from "../components/League/MyLeague";
import Link from "next/link";
import StyledLink from "../components/Link/StyledLink";
import { useState, useEffect } from "react";

// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    if (session) {
      async function getLeagues() {
        const response = await fetch(
          `/api/fantasyleagues?userId=${session.user.userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const leagueData = await response.json();
        setLeagues(leagueData);
      }
      getLeagues();
    }
  }, [session]);

  return (
    <>
      {session ? (
        <>
          {leagues.length > 0 ? (
            <MyLeague leagues={leagues} />
          ) : (
            <p>No Leagues</p>
          )}

          <a href="./create">Create New League</a>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
