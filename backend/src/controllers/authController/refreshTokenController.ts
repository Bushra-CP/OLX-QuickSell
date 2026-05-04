import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { generateAccessToken } from "../../utils/tokenUtils.js";

export const refreshTokenController = async (req: Request, res: Response) => {
  
    // console.log("cookies:", req.cookies);
  
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Please login" });

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as { userId: string };
    const newAccessToken = generateAccessToken(decoded.userId);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid Refresh Token" });
  }
};
