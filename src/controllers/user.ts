import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { jwtSecretKey } from "../constants";
import { validateEmailOrFail, validatePasswordOrFail } from "../utils";

const users: any[] = [];

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    validateEmailOrFail(email);
    validatePasswordOrFail(password);

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).send("Email is already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });

    res.status(201).send("User registered successfully.");
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    validateEmailOrFail(email);

    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).send("User not found.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Incorrect password.");
    }

    const token = sign({ email: user.email }, jwtSecretKey, {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export { registerUser, loginUser };
