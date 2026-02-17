import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret-pechincha-default";

interface TokenPayload {
  userId: number;
  type?: string;
}

export interface Session {
  userId: number;
}

/**
 * Valida um token JWT e cria um objeto de sessão
 * contendo o id do usuário extraído do token.
 *
 * Lança erro caso o token seja inválido ou expirado.
 */
export function createSessionFromToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies ? req.cookies.token: null;

    if (!token) {
        return res.status(403).json({
        auth: false, message: 'No token provided.'
        });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    if (typeof decoded != 'string') {
        if (decoded.type && decoded.type !== "access") {
        throw new Error("Token inválido.");
        }

        req.session = {
        userId: decoded.userId,
        };
    
        next();
    }
    else {
        return res.status(500).json({
        auth: false, message: 'Fail to authentication.'
        });
    
    }
  } catch (error) {
    return res.status(500).json({
        auth: false, message: 'Fail to authentication.'
    });
  }
}
