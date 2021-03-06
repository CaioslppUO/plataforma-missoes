import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Project").del();

  // Inserts seed entries
  await knex("Project").insert([
    {
      id: 1,
      projectName: "Fazenda Aldo",
      projectDate: "2022-06-10",
      idUser: 1,
    },
    {
      id: 2,
      projectName: "Sala Shiro - Lab Maker",
      projectDate: "2022-01-25",
      idUser: 1,
    },
    {
      id: 3,
      projectName: "Edifício das Águas - Secretaria academica",
      projectDate: "2022-5-30",
      idUser: 2,
    },
    {
      id: 4,
      projectName: "Plantação da Serra",
      projectDate: "2022-2-26",
      idUser: 3,
    },
    {
      id: 5,
      projectName: "Sítio do Marcos",
      projectDate: "2021-10-13",
      idUser: 4,
    },
  ]);
}
