import type { Request, Response } from "express";
import type { SignupService } from "../../services/userServices/signupService.js";

export class SignupController {
  constructor(private signupService: SignupService) {}

  signup = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const { user, jwtAccessToken, jwtRefreshToken } =
        await this.signupService.userSignup({ email, password });

      // console.log(user);

      res
        .cookie("refreshToken", jwtRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200)
        .json({
          message: "Signup successful",
          user,
          accessToken: jwtAccessToken,
        });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        message: error instanceof Error ? error.message : "Signup failed",
      });
    }
  };
}
