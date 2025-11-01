import jwt from "jsonwebtoken";

// ✅ JWT Encode Function
export const EncodeToken = (email, user_id) => {
  try {
    const PAYLOAD = { email, user_id };
    const token = jwt.sign(PAYLOAD, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '24h',
    });
    return token;
  } catch (error) {
    console.error("❌ Token Encode Error:", error.message);
    return null;
  }
};

// ✅ JWT Decode Function
export const DecodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("❌ Token Decode Error:", error.message);
    return null;
  }
};
