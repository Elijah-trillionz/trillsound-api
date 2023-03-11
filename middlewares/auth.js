const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token = req.header("admin-token");

  if (!token) {
    return res.status(401).json({
      errorMsg: "No token, authorization denied",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
      if (err) {
        return res.status(401).json({
          errorMsg: "No token. Not authenticated",
        });
      }

      req.admin = admin;
      next();
    });
  } catch (err) {
    return res.status(401).json({
      errorMsg: "Internal server error. Not authenticated",
    });
  }
}

module.exports = auth;
