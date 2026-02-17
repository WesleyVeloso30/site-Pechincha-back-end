import { Router, Request, Response } from "express";
import UserDTO from "../shared/models/user";
import { AuthService } from "../services/authService";
import { UserRepository } from "../repositories/userRepository";
import IUserRepository from "../repositories/interfaces/userRepositoryInterface";
import { IAuthService } from "../services/interface/authServiceInterface";

const authRoute = Router();
const userRepository: IUserRepository = new UserRepository();
const authService: IAuthService = new AuthService(userRepository);

authRoute.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const result = await authService.register({
      email,
      name,
      password,
    } as UserDTO);

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

authRoute.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
});

authRoute.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token não informado." });
    }

    const result = await authService.refresh(refreshToken);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
});

export default authRoute;
