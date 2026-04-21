import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // We return here to stop execution
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err, decoded: any) => {
    if (err) {
      // We return here so 'next()' is NEVER called if the token is bad
      return res.status(403).json({ message: "Token Expired" });
    }

    (req as any).userId = decoded.userId;
    next(); // Only move to the controller if everything is perfect
  });
};
