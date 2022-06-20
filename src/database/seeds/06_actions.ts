import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Action").del();

  // Inserts seed entries
  await knex("Action").insert([
    {
      id: 1,
      idLocation: 1,
      idActionType: 1,
    },
    {
      id: 2,
      idLocation: 2,
      idActionType: 1,
    },
    {
      id: 3,
      idLocation: 3,
      idActionType: 2,
    },
    {
      id: 4,
      idLocation: 4,
      idActionType: 1,
    },
    {
      id: 5,
      idLocation: 5,
      idActionType: 2,
    },
  ]);
}
