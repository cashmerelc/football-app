export default async function handler(req, res) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

  try {
    const response = await fetch(`${API_URL}/leagues?api_token=${API_TOKEN}`);

    if (response.ok) {
      const leagueData = await response.json();
      return res.status(200).json(leagueData);
    } else {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
