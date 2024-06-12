import styled from "styled-components";

export default function NewLeagueTeamForm({ onSubmit, leagueId, userId }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">League Name:</label>
        <input type="text" name="name" required></input>
        <input type="hidden" name="leagueId" value={leagueId || ""} />
        <input type="hidden" name="userId" value={userId || ""} />
        <button>Select Club</button>
        <button type="submit">Create Team</button>
      </form>
    </>
  );
}
