import { describe, it } from "node:test";
import assert from "assert";
import fs from "fs";
import SwaggerParser from "@apidevtools/swagger-parser";
import { generateOpenApiJson } from "./generateOpenApi";

describe("OpenAPI Tests", () => {
  it("should generate and validate OpenAPI JSON", async () => {
    // Generate OpenAPI JSON without writing to file
    const swagger = await generateOpenApiJson();

    // Validate the generated OpenAPI spec
    const validatedSpec = await SwaggerParser.validate(swagger);
    assert.ok(validatedSpec, "OpenAPI specification should be valid");
  });

  it("should generate OpenAPI JSON file", async () => {
    const testFilePath = "./test-openapi.json";

    try {
      // Generate and save OpenAPI JSON
      await generateOpenApiJson(testFilePath);

      // Verify file exists
      assert.ok(
        fs.existsSync(testFilePath),
        "OpenAPI JSON file should be created"
      );

      // Read and parse the file
      const fileContent = JSON.parse(fs.readFileSync(testFilePath, "utf-8"));

      // Validate the file content
      const validatedSpec = await SwaggerParser.validate(fileContent);
      assert.ok(validatedSpec, "File content should be valid OpenAPI spec");
    } finally {
      // Cleanup: remove test file
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  });
});
