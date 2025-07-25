import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { weatherWorkflowOnly } from "../workflows/weather-workflow";
import { z } from "zod";

const memory = new Memory({
  storage: new LibSQLStore({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!
  }),
  options: {
    workingMemory: {
      enabled: true,
      schema: z.object({
        city: z.string(),
        info: z.object({
          temperature: z.number(),
          humidity: z.number(),
          windSpeed: z.number(),
          precipitation: z.number(),
          timezone: z.string().optional()
        })
      })
    }
  }
});

export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherWorkflowOnly to fetch current weather data. If there are two locations in the prompt, use the otherCity parameter in weatherWorkflowOnly inputSchema to fetch the weather for the second location.
`,
  model: openai("gpt-4.1"),
  // model: openai("gpt-4.1", {
  //   structuredOutputs: true
  // }),
  workflows: { weatherWorkflowOnly },
  memory
});
