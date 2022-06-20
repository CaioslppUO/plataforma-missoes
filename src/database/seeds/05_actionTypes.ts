import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("ActionType").del();

  // Inserts seed entries
  await knex("ActionType").insert([
    {
      id: 1,
      actionName: "Ligar o pulverizador",
      actionDescription: "Liga o pulverizador do robô.",
    },
    {
      id: 2,
      actionName: "Esperar a recarga da bateria",
      actionDescription:
        "Espera que o robô carregue a bateria para prosseguir.",
    },
    {
      id: 3,
      actionName: "Ligar o módulo extra",
      actionDescription: "Ativa o relé que controla o módulo extra do robô.",
    },
    {
      id: 4,
      actionName: "Desligar o robô",
      actionDescription: "Desliga o robô de forma remota",
    },
  ]);
}
