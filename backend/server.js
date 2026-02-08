import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SIMPLE IN-MEMORY CACHE
const cache = new Map();

app.post("/api/investors", async (req, res) => {
  try {
    const { sector, country } = req.body;
    console.log("📥 Request:", req.body);

    if (!sector || !country) {
      return res.status(400).json({ result: "Sector and country required" });
    }

    // ✅ NORMALIZED CACHE KEY
    const cacheKey = `${sector.toLowerCase().trim()}-${country
      .toLowerCase()
      .trim()}`;

    // ✅ CACHE HIT
    if (cache.has(cacheKey)) {
      console.log("⚡ Cache hit");
      return res.json({ result: cache.get(cacheKey) });
    }

    // 🔥 AI CALL
    const hfResponse = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
          "X-Provider": "hf-inference",
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-8B-Instruct",
          messages: [
            {
              role: "user",
              content: `
List exactly top 3 investors or venture capital firms investing in ${sector} startups in ${country}.
For each investor:
- Write the investor name
- On the next line, write ONE short sentence explaining why they invest in this sector or region
Format strictly as:

Investor Name
Reason

Do not add numbering.
Do not add extra text.
`,
            },
          ],
          max_tokens: 200,
          temperature: 0,
          top_p: 1
        }),
      }
    );

    const data = await hfResponse.json();

    const result =
      data.choices?.[0]?.message?.content || "No investors found";

    // ✅ STORE IN CACHE
    cache.set(cacheKey, result);

    res.json({ result });

  } catch (err) {
    console.error("🔥 Backend error:", err);
    res.status(500).json({ result: "Backend error occurred" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});


