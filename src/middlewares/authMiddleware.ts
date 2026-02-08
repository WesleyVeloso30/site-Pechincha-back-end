import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret-pechincha-default";

export interface AuthPayload {
  userId: number;
  type?: string;
}

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não informado." });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    if (decoded.type !== "access") {
      res.status(401).json({ message: "Token inválido." });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
}
