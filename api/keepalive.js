const supabase = require("./_db");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method && req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const cronSecret = process.env.CRON_SECRET || process.env.VERCEL_CRON_SECRET;
  if (cronSecret) {
    const authHeader = String(req.headers.authorization || "");
    const providedToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    const queryToken = typeof req.query.secret === "string" ? req.query.secret : "";

    if (providedToken !== cronSecret && queryToken !== cronSecret) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  try {
    const { error } = await supabase.from("users").select("id").limit(1);

    if (error) {
      console.error("Keepalive failed:", error.message);
      return res.status(500).json({ error: "Heartbeat failed", details: error.message });
    }

    return res.status(200).json({ ok: true, message: "Supabase heartbeat successful" });
  } catch (error) {
    console.error("Keepalive exception:", error.message);
    return res.status(500).json({ error: "Heartbeat failed", details: error.message });
  }
};
