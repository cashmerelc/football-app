import styled from "styled-components";

export default function NewLeagueForm() {
  return (
    <>
      <form>
        <h2>2024/25 Season</h2>
        <label htmlFor="league-name">League Name:</label>
        <input type="text" name="league-name" required></input>
        <button type="submit">Create League</button>
      </form>
    </>
  );
}
