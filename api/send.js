export default async function handler(req, res) {

    // ✅ STEP 1: CORS (VERY IMPORTANT)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // ✅ STEP 2: Handle preflight (browser check)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        // ✅ STEP 3: Allow only POST
        if (req.method !== "POST") {
            return res.status(200).json({ message: "API working" });
        }

        // ✅ STEP 4: Parse body safely
        const body = typeof req.body === "string"
            ? JSON.parse(req.body)
            : req.body;

        const { name, guests, attend, note } = body;

        // ⚠️ USE YOUR VALUES
        const BOT_TOKEN = "YOUR_BOT_TOKEN";
        const CHAT_ID = "YOUR_CHAT_ID";

        const message = `💍 Wedding RSVP

👤 Name: ${name}
${attend === 'yes' ? '✅ Attending' : '❌ Not Attending'}
👥 Guests: ${guests}
📝 Note: ${note || 'None'}`;

        // ✅ STEP 5: Send to Telegram
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: data.description });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
}
