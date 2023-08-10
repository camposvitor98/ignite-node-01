import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../../infra/database";

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.post("/", async (request, response) => {
    const bodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });
    const { title, amount, type } = bodySchema.parse(request.body);

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return response.status(201).send();
  });

  app.get("/", async (_req, response) => {
    const transactions = await knex("transactions").select("*").returning("*");

    return response.status(200).send(transactions);
  });

  app.put("/:id", async (request, response) => {
    const paramsSchema = z.object({ id: z.string() });

    const bodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { id } = paramsSchema.parse(request.params);
    const { title, amount, type } = bodySchema.parse(request.body);

    const newTransaction = await knex("transactions")
      .update({
        title,
        amount: type === "credit" ? amount : amount * -1,
      })
      .where({ id })
      .returning("*");

    return response.status(200).send(newTransaction);
  });

  app.delete("/:id", async (request, response) => {
    const paramsSchema = z.object({ id: z.string() });

    const { id } = paramsSchema.parse(request.params);

    await knex("transactions").delete().where({ id });

    return response.status(200).send();
  });
};
