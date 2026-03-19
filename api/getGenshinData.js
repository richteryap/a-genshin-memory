export default async function handler(req, res) {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: "UID is required" });
  }

  try {
    // The SERVER makes the request to Enka, bypassing browser CORS entirely
    const response = await fetch(`https://enka.network/api/uid/${uid}`, {
      headers: {
        'User-Agent': 'a-genshin-memory/1.0' 
      }
    });

    if (!response.ok) {
        throw new Error(`Enka API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); 
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}