import { writeFile } from "fs/promises";
import { buildServer } from "./server";

export async function generateOpenApiJson(outputPath?: string) {
  const server = await buildServer();
  await server.ready();

  const swagger = server.swagger();

  if (outputPath) {
    await writeFile(outputPath, JSON.stringify(swagger, null, 2));
  }

  return swagger;
}

// Generate OpenAPI JSON if this file is run directly
if (require.main === module) {
  generateOpenApiJson("./openapi.json")
    .then(() => console.log("OpenAPI JSON generated successfully"))
    .catch(console.error);
}
