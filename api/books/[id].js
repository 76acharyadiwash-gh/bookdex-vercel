const supabase = require("../_db");
const verifyToken = require("../_auth");

module.exports = async (req, res) => {
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;

  /* PUT — update a book */
  if (req.method === "PUT") {
    const b = req.body;
    const { error } = await supabase
      .from("books")
      .update({
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
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ message: "updated" });
  }

  /* DELETE — remove a book */
  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ message: "deleted" });
  }

  res.status(405).json({ error: "Method not allowed" });
};
