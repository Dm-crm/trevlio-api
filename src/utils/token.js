// utils/token.ts
import jwt from "jsonwebtoken";
import { envDetails } from "../config/env.js";

const { JWT_REFRESH_SECRET, JWT_SECRET_KEY } = envDetails;

export const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
    expiresIn: "30m",
  });

//   const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
//     expiresIn: "1h",
//   });

  return { accessToken };
};
