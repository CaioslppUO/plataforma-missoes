import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("ActionType").del();

  // Inserts seed entries
  await knex("ActionType").insert([
    {
      id: 1,
      actionName: "Aguardar 5 minutos",
      actionDescription: "Espera 5 minutos.",
    },
    {
      id: 2,
      actionName: "Ligar o pulverizador",
      actionDescription: "Liga o pulverizador.",
    },
    {
      id: 3,
      actionName: "Desligar o pulverizador",
      actionDescription: "Desliga o pulverizador.",
    },
    {
      id: 4,
      actionName: "Nenhuma",
      actionDescription: "Não faz nada.",
    },
  ]);
}
