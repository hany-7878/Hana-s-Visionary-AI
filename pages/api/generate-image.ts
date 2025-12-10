import { HEIGHT, WIDTH } from "@/constants";
import { RequestProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const gptApiKey = process.env.GPT_API_KEY;
  const gptUrl = "https://chatgpt-42.p.rapidapi.com/texttoimage";

  if (!gptApiKey) {
    return res.status(500).json({ error: "GPT API key missing" });
  }

  try {
    const { prompt }: RequestProps = req.body;

    const apiRes = await fetch(gptUrl, {
      method: "POST",
      headers: {
        'x-rapidapi-key': gptApiKey,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: prompt,
        width: WIDTH,
        height: HEIGHT
      })
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      console.error("DALLE API response error:", text);
      return res.status(apiRes.status).json({ error: text });
    }

    const data = await apiRes.json();

    return res.status(200).json({
      message: data?.generated_image || "https://via.placeholder.com/600x400?text=Generated+Image"
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default handler;
