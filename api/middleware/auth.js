import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader == null) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(authHeader, "saad@123", (err, user) => {
    console.log(user);
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid token", token: authHeader });
    }

    req.user = user;
    next();
  });
};
