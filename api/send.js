export default async function handler(req, res) {
    try {
        const { name, guests, attend, note } = req.body;

        const BOT_TOKEN = "YOUR_BOT_TOKEN";
        const CHAT_ID = "YOUR_CHAT_ID";

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
        return res.status(500).json({ error: "Server error" });
    }
}
