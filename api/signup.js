const bcrypt = require("bcrypt");
const supabase = require("./_db");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  /* Check if email already exists */
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing)
    return res.status(409).json({ error: "Email already in use" });

  const hashed = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("users")
    .insert({ name, email, password: hashed });

  if (error)
    return res.status(500).json({ error: error.message });

  res.json({ message: "Account created! Please log in." });
};
