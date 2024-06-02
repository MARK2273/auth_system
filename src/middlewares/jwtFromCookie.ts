import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtFromCookie = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secret",
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded; // Attach user information to the request object
      next();
    }
  );
};

export default jwtFromCookie;
