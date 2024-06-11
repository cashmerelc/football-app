import styled from "styled-components";

export default function NewLeagueForm({ onSubmit, userId }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="leagueName">League Name:</label>
        <input type="text" name="leagueName" required></input>
        <input type="hidden" name="seasonId" value="2024/2025" />
        <input type="hidden" name="adminId" value={userId || ""} />
        <input type="hidden" name="readyState" value="false" />
        <input type="hidden" name="avatar" value="" />
        <input type="hidden" name="participants" value={userId || ""} />

        <button type="submit">Create League</button>
      </form>
    </>
  );
}
