import { Mastra } from "@mastra/core";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { UpstashTransport } from "@mastra/loggers/upstash";
import { weatherWorkflow } from "./workflows";
import { weatherAgent } from "./agents";

const upstashTransport = new UpstashTransport({
  upstashUrl: process.env.UPSTASH_URL!,
  upstashToken: process.env.UPSTASH_TOKEN!
});

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  storage: new LibSQLStore({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "debug",
    transports: {
      upstash: upstashTransport
    }
  })
});
