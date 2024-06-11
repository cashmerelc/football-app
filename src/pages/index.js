import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import Link from "next/link";
import StyledLink from "../components/Link/StyledLink";

// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return <>{session ? <a href="./create">Create New League</a> : <></>}</>;
}
