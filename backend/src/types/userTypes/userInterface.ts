export interface UserInterface {
  email: string;
  password: string;
}

export interface Signup {
  isUserExist(email: string): Promise<UserInterface | any>;

  signup(data: UserInterface): Promise<UserInterface | any>;
}

export interface Login {
  login(email: string): Promise<UserInterface | any>;
}
