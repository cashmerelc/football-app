import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PlayersPage() {
  const { data, error } = useSWR("/api/players", fetcher);

  if (!data && !error) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading players</h2>;

  const playerData = data.data;
  console.log("Player Data: ", playerData);

  return (
    <div>
      <h1>Players</h1>
      <ul>
        {playerData.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
}
