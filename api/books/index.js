const supabase = require("../_db");
const verifyToken = require("../_auth");

module.exports = async (req, res) => {
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  /* GET — list all books for this user */
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  /* POST — add a new book */
  if (req.method === "POST") {
    const b = req.body;
    const { data, error } = await supabase
      .from("books")
      .insert({
        title:       b.title,
        author:      b.author,
        genre:       b.genre,
        description: b.description,
        pages:       b.pages || 0,
        currentPage: b.currentPage || 0,
        status:      b.status,
        rating:      b.rating || null,
        notes:       b.notes,
        startDate:   b.startDate,
        finishDate:  b.finishDate,
        coverUrl:    b.coverUrl,
        user_id:     user.id,
      })
      .select("id")
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ id: data.id });
  }

  res.status(405).json({ error: "Method not allowed" });
};
