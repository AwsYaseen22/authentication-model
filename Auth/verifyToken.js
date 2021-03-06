const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.adminAuth = (req, res, next) => {
  console.log("admin auth calllllllllllled");
  // console.log("token in admin auth: ", req.cookies);
  // if use header
  // const token = req.header("auth-token");
  //   if use cookies
  const token = req.cookies.jwt;

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
  console.log("user auth calllllllllllled");
  // console.log("coooooookies", req.cookies.jwt);

  // const token = req.header("auth-token");
  //   if use cookies
  const token = req.cookies.jwt;

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

exports.tokenDetails = (token) => {
  // const token = req.cookies.jwt;
  if (!token) {
    return null;
  } else {
    let details;
    return jwt.verify(token, JWT_SECRET, (err, tokenData) => {
      if (err) {
        return err;
      }
      details = tokenData;
      return details;
    });
    // return details;
  }
};
