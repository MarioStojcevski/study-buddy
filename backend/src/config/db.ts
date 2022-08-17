import knex from "knex";
import { ANSI_COLORS } from "./terminal-colors";

const psqlPort = 5432;

export const pgsql = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: psqlPort,
    user: "postgres",
    password: "postgres",
    database: "study_buddy"
  }
});

async function testConnection(): Promise<void> {
  try {
    await pgsql.raw("SELECT 1");
    console.log(ANSI_COLORS.GREEN, `PostgreSQL connected on port ${psqlPort}!`);
  } catch(err: any) {
    console.log(ANSI_COLORS.RED, "PostgreSQL not connected!", err);
  }
}

testConnection();
