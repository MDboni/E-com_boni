import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {
  try {
    let token =
      req.headers["token"] ||
      req.cookies["token"] ||
      (req.headers["authorization"]
        ? req.headers["authorization"].replace("Bearer ", "")
        : null);

    if (!token) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const decoded = DecodeToken(token);
    if (!decoded) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    // ✅ user info attach করা হচ্ছে
    req.headers.email = decoded.email;
    req.headers.user_id = decoded.user_id;

    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
};
