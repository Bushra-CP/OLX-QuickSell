import { SignupController } from "../../controllers/userController.ts/signupController.js";
import { SignupRepository } from "../../repositories/userRepository/signupRepository.js";
import { SignupService } from "../../services/userServices/signupService.js";

const signupRepo = new SignupRepository();

const signupService = new SignupService(signupRepo);

export const signupController = new SignupController(signupService);
