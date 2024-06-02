import { Request, Response } from "express";
import {
  registerUser,
  findUserByEmail,
  validatePassword,
} from "../services/authService";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const user = await registerUser(email, password, name);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await validatePassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = generateToken(user);

    // Set token in cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};
