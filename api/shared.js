const supabase = require("./_db");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const token = req.query.t;
  if (typeof token !== "string" || !/^[a-f0-9]{32}$/i.test(token))
    return res.status(400).json({ error: "Invalid share link" });

  const { data: owner, error: ownerError } = await supabase
    .from("users")
    .select("id, name")
    .eq("share_token", token)
    .maybeSingle();

  if (ownerError)
    return res.status(500).json({ error: "Could not load this library" });
  if (!owner)
    return res.status(404).json({ error: "This link is invalid or sharing was turned off" });

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("id,title,author,genre,description,pages,currentPage,status,rating,notes,startDate,finishDate,coverUrl")
    .eq("user_id", owner.id)
    .order("id", { ascending: false });

  if (booksError)
    return res.status(500).json({ error: "Could not load this library" });

  return res.json({ owner: owner.name || "BookDex user", books });
};
