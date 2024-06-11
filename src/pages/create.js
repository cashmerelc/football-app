import NewLeagueForm from "../components/Form/NewLeague.js";
import { useSession } from "next-auth/react";

export default function CreateLeague() {
  const { data: session } = useSession();
  const userId = session.user.userId;
  return (
    <>
      <NewLeagueForm userId={userId} />
    </>
  );
}
