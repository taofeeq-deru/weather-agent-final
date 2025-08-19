import { Mastra } from "@mastra/core";
// import { PinoLogger } from "@mastra/loggers";
// import { LibSQLStore } from "@mastra/libsql";
import { VercelDeployer } from "@mastra/deployer-vercel";
// import { UpstashTransport } from "@mastra/loggers/upstash";
import { weatherWorkflow } from "./workflows";
import { weatherAgent } from "./agents";
import { v_nextNetwork, workflow1 } from "./networks";

// const upstashTransport = new UpstashTransport({
//   upstashUrl: process.env.UPSTASH_URL!,
//   upstashToken: process.env.UPSTASH_TOKEN!
// });

export const mastra = new Mastra({
  workflows: { weatherWorkflow, workflow1 },
  agents: { weatherAgent },
  vnext_networks: {
    v_nextNetwork
  },
  // storage: new LibSQLStore({
  //   url: process.env.TURSO_URL!,
  //   authToken: process.env.TURSO_TOKEN!
  // }),
  // logger: new PinoLogger({
  //   name: "Mastra",
  //   level: "debug",
  //   transports: {
  //     upstash: upstashTransport
  //   }
  // }),
  deployer: new VercelDeployer()
});
