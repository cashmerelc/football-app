import NewLeagueTeamForm from "../components/Form/NewLeagueTeam.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreateLeagueTeam() {
  const router = useRouter();
  const { mutate } = useSWR("/api/fantasyleagues");
  const { data: session } = useSession();
  console.log(session);

  async function addLeagueTeam(leagueTeam) {
    console.log("Add League data from form submit: ", leagueTeam);
    const response = await fetch("/api/fantasyleagues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(league),
    });

    if (response.ok) {
      mutate();
      router.push("/");
    }
  }

  return (
    <>
      {session ? (
        <NewLeagueTeamForm
          onSubmit={addLeagueTeam}
          userId={session.user.userId}
        />
      ) : (
        <p>Please sign in</p>
      )}
    </>
  );
}
