const jwt = require("jsonwebtoken");
const throwError = require("../helpers/throwError");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throwError(401, "No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.userId;
    req.organisationId = payload.organisationId;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
