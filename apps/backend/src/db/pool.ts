import pg from "pg";
import { env } from "../config/index.js";
import { logger } from "../logging/logger.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000
});

pool.on("error", (error) => {
  logger.error({ err: error }, "Unexpected database client error");
});
