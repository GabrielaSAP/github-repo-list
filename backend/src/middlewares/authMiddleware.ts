import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ message: "Not authenticated." });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "Invalid token." });
    return;
  }

  req.user = decoded;
  next();
};
