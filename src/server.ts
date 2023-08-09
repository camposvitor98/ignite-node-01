import fastify from "fastify";

const app = fastify();

app.get("/hello", () => {
  return "Hello world!";
});

app
  .listen({
    port: 9898,
  })
  .then(() => console.log("listening on port 9898"));
