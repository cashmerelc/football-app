import styled from "styled-components";
import LeagueCard from "../Card/LeagueCard";

export default function MyLeagues({ leagues }) {
  return (
    <>
      <ul>
        {leagues.map((league) => {
          return (
            <li key={league._id}>
              <LeagueCard league={league} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
