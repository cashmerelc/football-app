import styled from "styled-components";
import Link from "next/link";
import LeagueCard from "./LeagueCard";

export default function MyLeagues({ leagues }) {
  return (
    <>
      <ul>
        {leagues.map((league) => {
          return (
            <li key={league._id}>
              <Link href={`/fantasyleagues/${league._id}`}>
                <LeagueCard league={league} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
