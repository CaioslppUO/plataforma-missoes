import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Mission").del();

  // Inserts seed entries
  await knex("Mission").insert([
    {
      id: 1,
      missionOrder: 1,
      missionName: "Irrigar a plantação norte",
      idProject: 1,
    },
    {
      id: 2,
      missionOrder: 2,
      missionName: "Irrigar a plantação sul",
      idProject: 1,
    },
    {
      id: 3,
      missionOrder: 3,
      missionName: "Recarregar as baterias",
      idProject: 1,
    },
    {
      id: 4,
      missionOrder: 1,
      missionName: "Levar as ferramentas para o lab maker",
      idProject: 2,
    },
    {
      id: 5,
      missionOrder: 1,
      missionName: "Levar documentos de matrícula",
      idProject: 3,
    },
    {
      id: 6,
      missionOrder: 1,
      missionName: "Levar água para o canteiro",
      idProject: 4,
    },
    {
      id: 7,
      missionOrder: 2,
      missionName: "Pulverizar plantação da baixada",
      idProject: 4,
    },
    {
      id: 8,
      missionOrder: 3,
      missionName: "Irrigar plantação da baixada",
      idProject: 4,
    },
    {
      id: 9,
      missionOrder: 4,
      missionName: "Recarregar as baterias",
      idProject: 4,
    },
    {
      id: 10,
      missionOrder: 1,
      missionName: "Levar comida pros animais",
      idProject: 5,
    },
  ]);
}
