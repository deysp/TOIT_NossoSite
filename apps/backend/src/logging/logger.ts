import pino from "pino";
import type { Logger, LoggerOptions } from "pino";
import { isProduction } from "../config/index.js";

const maybeModule = pino as unknown as {
  default?: (options?: LoggerOptions) => Logger;
};

const pinoFactory: (options?: LoggerOptions) => Logger =
  maybeModule.default ?? ((pino as unknown as (options?: LoggerOptions) => Logger));

export const logger = pinoFactory({
  level: isProduction ? "info" : "debug",
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          translateTime: "SYS:standard",
          ignore: "pid,hostname"
        }
      }
});
