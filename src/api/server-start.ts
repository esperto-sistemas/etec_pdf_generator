import { buildServer } from "./server";

const start = async () => {
  const server = await buildServer();

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" }); // listen on all interfaces, this will make your server accessible from other devices

    console.log("Server is running on http://localhost:3000");
    console.log("API documentation available at http://localhost:3000/docs");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
