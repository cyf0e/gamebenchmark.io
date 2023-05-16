export function authenticate(req, res, next) {
  const APIKey = req.get("API-Key");
  if (APIKey) {
    if (APIKey == process.env.ADMIN_API_KEY) {
      next();
    } else {
      res.status(401).json({ error: "Wrong api key." });
    }
  } else {
    res
      .status(401)
      .json({ error: "Api key required to create database entries." });
  }
}
