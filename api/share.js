const crypto = require("crypto");
const supabase = require("./_db");
const verifyToken = require("./_auth");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("users")
      .select("share_token")
      .eq("id", user.id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ token: data.share_token || null });
  }

  if (req.method === "POST") {
    const { data: existing, error: readError } = await supabase
      .from("users")
      .select("share_token")
      .eq("id", user.id)
      .single();

    if (readError) return res.status(500).json({ error: readError.message });
    if (existing.share_token) return res.json({ token: existing.share_token });

    const token = crypto.randomBytes(16).toString("hex");
    const { data: updated, error: updateError } = await supabase
      .from("users")
      .update({ share_token: token })
      .eq("id", user.id)
      .is("share_token", null)
      .select("share_token")
      .maybeSingle();

    if (updateError) return res.status(500).json({ error: updateError.message });
    if (updated) return res.json({ token: updated.share_token });

    const { data: raced, error: raceError } = await supabase
      .from("users")
      .select("share_token")
      .eq("id", user.id)
      .single();

    if (raceError) return res.status(500).json({ error: raceError.message });
    if (!raced.share_token)
      return res.status(500).json({ error: "Could not create share link" });
    return res.json({ token: raced.share_token });
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("users")
      .update({ share_token: null })
      .eq("id", user.id);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ token: null });
  }

  return res.status(405).json({ error: "Method not allowed" });
};
