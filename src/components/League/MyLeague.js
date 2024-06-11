import styled from "styled-components";
import Link from "next/link";
import Card from "../Card/LeagueCard";
import useSWR from "swr";

export default function MyLeagues({ leagues }) {
  return (
    <>
      <ul>
        {leagues.map((league, index) => {
          <li key={index}>
            <LeagueCard league={league} />
          </li>;
        })}
      </ul>
    </>
  );
}
