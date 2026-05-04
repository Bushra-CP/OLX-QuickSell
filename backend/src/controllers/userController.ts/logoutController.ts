import type { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
