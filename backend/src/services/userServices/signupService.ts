import type {
  Signup,
  UserInterface,
} from "../../types/userTypes/userInterface.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/tokenUtils.js";

export class SignupService {
  constructor(private signupInterface: Signup) {}

  async userSignup(userData: UserInterface) {
    const userExists = await this.signupInterface.isUserExist(userData.email);

    if (userExists) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const data = {
      ...userData,
      password: hashedPassword,
    };

    const user = await this.signupInterface.signup(data);

    const jwtAccessToken = generateAccessToken(user._id.toString());
    const jwtRefreshToken = generateRefreshToken(user._id.toString());

    return { user, jwtAccessToken, jwtRefreshToken };
  }
}
