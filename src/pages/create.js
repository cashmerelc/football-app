import NewLeagueForm from "../components/Form/NewLeague.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreateLeague() {
  const router = useRouter();
  const { mutate } = useSWR("/api/fantasyleagues");
  const { data: session } = useSession();
  console.log(session);

  async function addLeague(league) {
    console.log("Add League data from form submit: ", league);
    const response = await fetch("/api/fantasyleagues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(league),
    });

    if (response.ok) {
      mutate();
      // router.push("/");
    }
  }

  return (
    <>
      {session ? (
        <NewLeagueForm onSubmit={addLeague} userId={session.user.userId} />
      ) : (
        <p>Please sign in</p>
      )}
    </>
  );
}
