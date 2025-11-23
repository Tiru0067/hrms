module.exports = (err, req, res, next) => {
  console.error("ERROR:", err);

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: "Duplicate entry detected" });
  }

  res.status(500).json({ error: "Internal server error" });
};
