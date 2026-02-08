import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import UserDTO from "../shared/src/models/user";
import IUserRepository from "../repositories/interfaces/userRepositoryInterface";
import { IAuthService, AuthResponse } from "./interface/authServiceInterface";

const JWT_SECRET = process.env.JWT_SECRET || "secret-pechincha-default";
const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = "30m";
const REFRESH_TOKEN_EXPIRES_IN = "30d";
const ACCESS_TOKEN_EXPIRES_IN_SECONDS = 30 * 60;

export class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(data: UserDTO): Promise<AuthResponse> {
    const { email, name, password } = data;

    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new Error("Usuário já cadastrado com este email.");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await this.userRepository.create({
      email,
      name: name || null,
      password: hashedPassword,
    });

    const token = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);
    return {
      user: { id: user.id, email: user.email, name: user.name ?? undefined },
      token,
      refreshToken,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user?.password) {
      throw new Error("Email ou senha inválidos.");
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      throw new Error("Email ou senha inválidos.");
    }

    const token = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);
    return {
      user: { id: user.id, email: user.email, name: user.name ?? undefined },
      token,
      refreshToken,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    };
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken) {
      throw new Error("Refresh token não informado.");
    }
    const decoded = this.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    const token = this.generateAccessToken(user.id);
    const newRefreshToken = this.generateRefreshToken(user.id);
    return {
      user: { id: user.id, email: user.email, name: user.name ?? undefined },
      token,
      refreshToken: newRefreshToken,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    };
  }

  private generateAccessToken(userId: number): string {
    return jwt.sign(
      { userId, type: "access" },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
  }

  private generateRefreshToken(userId: number): string {
    return jwt.sign(
      { userId, type: "refresh" },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
  }

  private verifyRefreshToken(token: string): { userId: number } {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; type?: string };
    if (decoded.type !== "refresh") {
      throw new Error("Token inválido.");
    }
    return decoded;
  }
}
