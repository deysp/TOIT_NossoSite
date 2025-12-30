import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../logging/logger.js";
import { HttpError } from "../utils/http-error.js";

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof HttpError) {
    logger.warn({ err: error, details: error.details }, "Handled HttpError");
    return response.status(error.status).json({
      status: "error",
      message: error.message,
      details: error.details ?? null
    });
  }

  if (error instanceof ZodError) {
    logger.warn({ err: error }, "Validation error");
    return response.status(422).json({
      status: "error",
      message: "Invalid request payload",
      details: error.flatten()
    });
  }

  logger.error({ err: error }, "Unhandled error");
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
};
