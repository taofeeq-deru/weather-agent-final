import { Mastra } from "@mastra/core";
import { weatherWorkflow } from "./workflows";
import { weatherAgent } from "./agents";
import { v_nextNetwork, workflow1 } from "./networks";

export const mastra = new Mastra({
  workflows: { weatherWorkflow, workflow1 },
  agents: { weatherAgent },
  vnext_networks: {
    v_nextNetwork
  },
  server: {
    port: 8080,
    host: "0.0.0.0"
  }
});
