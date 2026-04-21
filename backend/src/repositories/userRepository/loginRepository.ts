import { userModel } from "../../model/userModel.js";
import type {
  Login,
  UserInterface,
} from "../../types/userTypes/userInterface.js";

export class LoginRepository implements Login {
  async login(email: string) {
    return userModel.findOne({ email });
  }
}
