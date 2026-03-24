export default async function handler(req, res) {
    try {
        // ✅ FIX: parse body safely
        const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

        const { name, guests, attend, note } = body;

        const BOT_TOKEN = "8550677960:AAGGmrJRGpOP4FRTOyoCyH_K0VEvneHnrl8";
        const CHAT_ID = "1059586105";

        const message = `💍 Wedding RSVP

👤 Name: ${name}
${attend === 'yes' ? '✅ Attending' : '❌ Not Attending'}
👥 Guests: ${guests}
📝 Note: ${note || 'None'}`;

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
        console.log(error); // 🔥 helps debugging
        return res.status(500).json({ error: "Server error" });
    }
}
