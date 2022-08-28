import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../models/userModel";

declare module "Express" {
  export interface Request {
    user?: IUser | null;
  }
}

const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (auth?.startsWith("bearer") || auth?.startsWith("Bearer")) {
      const token = auth.split(" ")[1];
      try {
        const decoded = <JwtPayload>(
          jwt.verify(token, <string>process.env.JWT_SECRET)
        );
        const user = await User.findById(decoded?.id).select(["-password"]);
        req.user = user;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized");
      }
    } else {
      res.status(401);
      throw new Error("Not Authorized, no token");
    }
  }
);

const protectAdmin = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (auth?.startsWith("bearer") || auth?.startsWith("Bearer")) {
      const token = auth.split(" ")[1];
      try {
        const decoded = <JwtPayload>(
          jwt.verify(token, <string>process.env.JWT_SECRET)
        );
        const user = await User.findById(decoded?.id).select(["-password"]);
        if (user && user.role === "admin") {
          req.user = user;
          next();
        } else {
          res.status(401);
          throw new Error("Not Authorized, admin permissions is required");
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized");
      }
    } else {
      res.status(401);
      throw new Error("Not Authorized, no token");
    }
  }
);

export { protect, protectAdmin };
