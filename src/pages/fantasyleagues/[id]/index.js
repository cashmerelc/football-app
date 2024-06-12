import { useRouter } from "next/router.js";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function FantasyLeagueDetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(
    `/api/fantasyleagues/${id}`,
    fetcher
  );

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  const league = data.league;
  return (
    <>
      <h1>{league.leagueName}</h1>
      <h2>{league.seasonId}</h2>
      <ul>
        <h3>Participants:</h3>
        {league.participants.map((participant, index) => {
          <li key={index}>{participant}</li>;
        })}
      </ul>
    </>
  );
}
