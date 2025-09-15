import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (req, res, next) => {
  try {
    const token = req.signedCookies.currentUser;
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.redirect("/");
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.redirect("/");
  }
};