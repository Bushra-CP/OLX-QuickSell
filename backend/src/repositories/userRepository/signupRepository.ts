import { userModel } from "../../model/userModel.js";
import type {
  Signup,
  UserInterface,
} from "../../types/userTypes/userInterface.js";

export class SignupRepository implements Signup {
  async isUserExist(email: string) {
    return userModel.findOne({ email });
  }

  async signup(data: UserInterface) {
    return userModel.create(data);
  }
}
