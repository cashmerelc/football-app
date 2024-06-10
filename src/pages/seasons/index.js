import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SeasonsPage() {
  const { data, error } = useSWR("/api/seasons", fetcher);

  if (!data && !error) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading seasons</h2>;

  const seasonData = data.data;
  console.log("Data: ", data);

  return (
    <div>
      <h1>Seasons</h1>
      <ul>
        {seasonData.map((season) => (
          <li key={season.id}>
            Year: {season.name} id: {season.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
