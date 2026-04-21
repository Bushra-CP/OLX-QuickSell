import type { Request, Response } from "express";
import type { LoginService } from "../../services/userServices/loginService.js";

export class LoginController {
  constructor(private loginService: LoginService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const { user, jwtAccessToken, jwtRefreshToken } =
        await this.loginService.userLogin({ email, password });

        console.log({ user, jwtAccessToken, jwtRefreshToken });
        
      res
        .cookie("refreshToken", jwtRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200)
        .json({
          message: "Login successful",
          user,
          accessToken: jwtAccessToken,
        });
    } catch (error) {
      console.log(error);

      res.status(500).json("Login failed");
    }
  };
}
