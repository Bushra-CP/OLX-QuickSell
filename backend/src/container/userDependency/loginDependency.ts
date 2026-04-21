import { LoginController } from "../../controllers/userController.ts/loginController.js";
import { LoginRepository } from "../../repositories/userRepository/loginRepository.js";
import { LoginService } from "../../services/userServices/loginService.js";

const loginRepo = new LoginRepository();

const loginService = new LoginService(loginRepo);

export const loginController = new LoginController(loginService);
