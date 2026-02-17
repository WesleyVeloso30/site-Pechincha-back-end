import UserDTO from "../../shared/models/user";

export interface AuthResponse {
  user: Omit<UserDTO, "password">;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IAuthService {
  register(data: UserDTO): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthResponse>;
  refresh(refreshToken: string): Promise<AuthResponse>;
}
