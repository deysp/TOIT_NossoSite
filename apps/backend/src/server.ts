import cors from "cors";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
import type { HttpLogger, Options as PinoHttpOptions } from "pino-http";
import { env } from "./config/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { contactRouter } from "./routes/contact.js";
import { logger } from "./logging/logger.js";

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(
  cors({
    origin: env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
  })
);

app.use(express.json({ limit: "1mb" }));
type PinoHttpFactory = <IM, SR, CustomLevels extends string = never>(
  options?: PinoHttpOptions<IM, SR, CustomLevels>
) => HttpLogger<IM, SR, CustomLevels>;

const pinoHttpModule = pinoHttp as unknown as {
  default?: PinoHttpFactory;
};

const pinoHttpFactory: PinoHttpFactory = pinoHttpModule.default ?? (pinoHttp as unknown as PinoHttpFactory);

app.use(pinoHttpFactory({ logger }));

app.get("/health", (_request, response) => {
  response.json({ status: "healthy" });
});

app.use("/api", contactRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number.parseInt(env.PORT, 10);

if (Number.isNaN(port)) {
  throw new Error("PORT must be a valid integer");
}

app.listen(port, "0.0.0.0", () => {
  logger.info({ port }, "Backend server started");
});
