import express, { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { jwtSecretKey } from "../constants";
import { validateEmailOrFail, validatePasswordOrFail } from "../utils";
import bcrypt from "bcrypt";

const router = express.Router();

const users: any[] = [];

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      console.log(req);

      validateEmailOrFail(email);
      validatePasswordOrFail(password);

      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        return res.status(400).sendRes("Email is already registered.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ email, password: hashedPassword });
      console.log(users);

      res.status(201).sendRes("User registered successfully.");
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    validateEmailOrFail(email);

    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).sendRes("User not found.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).sendRes("Incorrect password.");
    }

    const token = sign({ email: user.email }, jwtSecretKey, {
      expiresIn: "1h",
    });
    res.status(200).sendRes({ token });
  } catch (error) {
    res.status(400).sendRes(error);
  }
});

export const userRouter = router;
