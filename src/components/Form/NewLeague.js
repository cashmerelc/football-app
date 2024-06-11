import styled from "styled-components";

export default function NewLeagueForm({ userId }) {
  const leagueAdmin = userId;
  console.log("admin id: ", leagueAdmin);

  function addLeague(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("Form data: ", data);
  }

  return (
    <>
      <form onSubmit={addLeague}>
        <h2>2024/25 Season</h2>
        <label htmlFor="league-name">League Name:</label>
        <input type="text" name="league-name" required></input>
        <button type="submit">Create League</button>
      </form>
    </>
  );
}
