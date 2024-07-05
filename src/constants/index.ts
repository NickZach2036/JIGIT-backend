import { config } from "dotenv";

config();

export const jwtSecretKey = process.env.JWT_SECRET_KEY || "";
export const postgresDb = process.env.POSTGRES_DB || "";
export const postgresUser = process.env.POSTGRES_USER || "";
export const postgresPassword = process.env.POSTGRES_PASSWORD || "";
export const postgresHost = process.env.POSTGRES_HOST || "";
export const databasePort = process.env.DATABASE_PORT || "";
export const port = process.env.PORT || 3000;

if (!jwtSecretKey.length) {
  throw new Error("JWT_SECRET_KEY is not defined in .env");
}

if (!postgresDb.length) {
  throw new Error("POSTGRES_DB is not defined in .env");
}

if (!postgresUser.length) {
  throw new Error("POSTGRES_USER is not defined in .env");
}

if (!postgresPassword.length) {
  throw new Error("POSTGRES_PASSWORD is not defined in .env");
}

if (!postgresHost.length) {
  throw new Error("POSTGRES_HOST is not defined in .env");
}

if (!databasePort.length) {
  throw new Error("DATABASE_PORT is not defined in .env");
}
