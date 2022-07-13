const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.adminAuth = (req, res, next) => {
  const token = req.header("auth-token");
  //   if use cookies
  //   const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }
  try {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not Authorized!" });
      } else {
        if (decodedToken.role !== "Admin") {
          return res.status(401).json({ message: "not admin" });
        } else {
          next();
        }
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid token!" }, console.error);
  }
};

exports.userAuth = (req, res, next) => {
  const token = req.header("auth-token");
  //   if use cookies
  //   const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }
  try {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not Authorized!" });
      } else {
        if (decodedToken.role !== "Basic") {
          return res.status(401).json({ message: "not authorized" });
        } else {
          next();
        }
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid token!" }, console.error);
  }
};
