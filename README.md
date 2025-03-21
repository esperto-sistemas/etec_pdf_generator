# PDF Generator

This project is a PDF generator API built with Fastify and TypeScript. It provides a simple and efficient way to generate PDF documents from various input formats. The API is designed to be fast, type-safe, and easy to use.

## Features

- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety and modern JavaScript features
- [TypeBox](https://github.com/sinclairzx81/typebox) - JSON Schema Type Builder with static type resolution
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - API documentation and testing interface
- Request/Response validation out of the box
- Built-in test setup using Node's test runner
- Docker support for containerized deployment

## Getting Started

### Prerequisites

- Node.js 18+ (for test runner support)
- npm or yarn
- Docker (optional, for containerization)

### Installation

```bash
# Clone the repository
git clone pdf-generator

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Generate OpenAPI documentation
npm run generate-openapi
```

The server will start at `http://localhost:3000`. Visit `http://localhost:3000/docs` for the Swagger UI.

### Docker

```bash
# Build the Docker image
docker build -t pdf-generator .

# Run the container
docker run -p 3000:3000 pdf-generator
```

The containerized application will be available at `http://localhost:3000`.

## Adding New Endpoints

1. Define your request/response types in `types/`:

```typescript
// types/MyRequest.ts
import { Type, Static } from '@sinclair/typebox'

export const MyRequestSchema = Type.Object(
  {
    field: Type.String(),
  },
  { description: 'My request schema' },
)

export type MyRequest = Static<typeof MyRequestSchema>
```

2. Add your route in `api/routes.ts`:

```typescript
fastify.post<{ Body: MyRequest; Reply: MyResponse }>(
  '/my-endpoint',
  {
    schema: {
      description: 'My endpoint',
      body: MyRequestSchema,
      response: {
        200: MyResponseSchema,
        400: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
    },
  },
  async (request, reply) => {
    // Your handler logic
  },
)
```

## Testing

The template includes a test setup using Node's built-in test runner. Tests are located in `*.test.ts` files.

```typescript
import { test } from 'node:test'
import assert from 'assert'
import { buildServer } from './server'

test('my test', async () => {
  const server = await buildServer()
  const response = await server.inject({
    method: 'POST',
    url: '/my-endpoint',
    payload: { field: 'value' },
  })
  assert.strictEqual(response.statusCode, 200)
})
```

## API Documentation

The API documentation is automatically generated from your TypeBox schemas and is available at `/docs` when the server is running. You can also generate a static OpenAPI JSON file:

```bash
npm run generate-openapi
```

## Error Handling

The template includes standardized error responses. All endpoints automatically include 400 and 500 error responses in their documentation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
