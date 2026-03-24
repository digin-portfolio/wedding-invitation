export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        if (req.method !== "POST") {
            return res.status(200).json({ message: "API working" });
        }

        const body = typeof req.body === "string"
            ? JSON.parse(req.body)
            : req.body;

        const { name, message } = body;

        const BOT_TOKEN = "YOUR_BOT_TOKEN";
        const CHAT_ID = "YOUR_CHAT_ID";

        const text = `💌 New Wish

👤 ${name}
💬 ${message}`;

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text
            })
        });

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: data.description });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
}
