import type {
  Login,
  UserInterface,
} from "../../types/userTypes/userInterface.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/tokenUtils.js";

export class LoginService {
  constructor(private loginInterface: Login) {}

  async userLogin(userData: UserInterface) {
    const user = await this.loginInterface.login(userData.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const jwtAccessToken = generateAccessToken(user._id.toString());
    const jwtRefreshToken = generateRefreshToken(user._id.toString());

    return { user, jwtAccessToken, jwtRefreshToken };
  }
}
