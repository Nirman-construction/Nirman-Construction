export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OPENAI_API_KEY Vercel mein configured nahi hai."
    });
  }

  try {
    const messages = req.body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Message required" });
    }

    const safeMessages = messages
      .filter(m =>
        ["user", "assistant"].includes(m.role) &&
        typeof m.content === "string"
      )
      .slice(-12);

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "You are Nirman Construction's helpful website assistant in Ranchi, Jharkhand. Reply in friendly Hindi or Hinglish. Explain construction services, estimates, quotations, and project requirements. Never invent exact prices or promise an estimate without details. For a quotation, ask for project location, area, floors, and required work. Contact: +91 8810424102, info@nirmanconstruction.net.in. Website: https://nirmanconstruction.net.in"
            },
            ...safeMessages
          ],
          max_tokens: 500
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return res.status(502).json({
        error: data.error?.message || "OpenAI API request failed"
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({ error: "Empty AI response" });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Nirman AI error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
