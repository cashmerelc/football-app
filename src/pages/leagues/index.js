import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LeaguesPage() {
  const { data, error } = useSWR("/api/leagues", fetcher);

  if (!data && !error) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading leagues</h2>;

  const leagueData = data.data;

  return (
    <div>
      <h1>Leagues</h1>
      <ul>
        {leagueData.map((league) => (
          <li key={league.id}>{league.name}</li>
        ))}
      </ul>
    </div>
  );
}
