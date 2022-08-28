import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resStatus = String(res.statusCode);
  const statusCode =
    resStatus.startsWith("4") || resStatus.startsWith("5")
      ? res.statusCode
      : 400;
  const nodeEnv = process.env.NODE_ENV;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: nodeEnv === "development" ? err.stack : null,
    statusCode,
  });
  next();
};

export default errorMiddleware;
