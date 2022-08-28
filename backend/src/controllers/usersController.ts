import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//@desc   Login new user
//@route  POST /api/users/login
//@access Private
const loginUser = AsyncHandler(async (req: Request, res: Response) => {
  //get request body
  const { name, password } = req.body;

  //find user and compare password
  const user = await User.findOne({ name });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user._id, user.role);
    res.json({ id: user._id, name: user.name, role: user.role, token });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export { loginUser };
