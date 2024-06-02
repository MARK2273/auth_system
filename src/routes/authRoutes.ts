import express from "express";
import { register, login } from "../controllers/authController";
import passport from "passport";
import jwtFromCookie from "../middlewares/jwtFromCookie";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", jwtFromCookie, (req, res) => {
  res.json({ message: "You have accessed a protected route!", user: req.user });
});

export default router;
