import type { Request } from "express";

export const extractClientIp = (request: Request): string | null => {
  const forwarded = request.header("x-forwarded-for");
  if (forwarded) {
    const [first] = forwarded.split(",");
    return first?.trim() ?? null;
  }

  const direct = request.socket.remoteAddress;
  return direct ?? null;
};
