import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (_request: Request, response: Response, _next: NextFunction) => {
  response.status(404).json({
    status: "error",
    message: "Resource not found"
  });
};
