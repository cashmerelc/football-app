export default async function handler(req, res) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

  if (req.method === "GET") {
    try {
      const response = await fetch(`${API_URL}/players?api_token=${API_TOKEN}`);

      if (response.ok) {
        const playerData = await response.json();
        console.log("playerData: ", playerData);

        return res.status(200).json(playerData);
      } else {
        console.log("Issue fetching player data");

        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
