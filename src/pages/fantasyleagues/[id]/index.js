import { useRouter } from "next/router";
import useSWR from "swr";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function FantasyLeagueDetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, error } = useSWR(
    () => (isReady ? `/api/fantasyleagues/${id}` : null),
    fetcher
  );
  const [leagueParticipants, setLeagueParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (data && data.league && data.league.participants.length > 0) {
        const participants = await Promise.all(
          data.league.participants.map(async (participantId) => {
            const response = await fetch(`/api/user/${participantId}`);
            const result = await response.json();
            return result.user;
          })
        );
        setLeagueParticipants(participants);
      }
      setLoadingParticipants(false);
    };

    if (data) {
      fetchParticipants();
    }
  }, [data]);

  if (!isReady || !data || error) return <h2>Loading...</h2>;

  const league = data.league;

  return (
    <>
      <h1>{league.leagueName}</h1>
      <h2>{league.seasonId}</h2>
      <ul>
        <h3>Participants:</h3>
        {leagueParticipants.length > 0 ? (
          leagueParticipants.map((participant, index) => (
            <li key={index}>
              {participant.username} - {participant.email}
            </li>
          ))
        ) : (
          <p>No participants found.</p>
        )}
      </ul>
      {league.readyState === "false" ? (
        <>
          <button>Invite Others</button> <button>Leave League</button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
