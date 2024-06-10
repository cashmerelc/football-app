export default async function handler(req, res) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

  if (req.method === "GET") {
    try {
      const response = await fetch(`${API_URL}/seasons?api_token=${API_TOKEN}`);

      if (response.ok) {
        const seasonData = await response.json();
        console.log("seasonData: ", seasonData);

        return res.status(200).json(seasonData);
      } else {
        console.log("Issue fetching season data");

        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
