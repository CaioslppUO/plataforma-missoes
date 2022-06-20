import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Projects").del();

  // Inserts seed entries
  await knex("Projects").insert([
    {
      idProject: 1,
      projectName: "Fazenda Aldo",
      projectDate: "2022-06-10",
      idUser: 1,
    },
    {
      idProject: 2,
      projectName: "Sala Shiro - Lab Maker",
      projectDate: "2022-01-25",
      idUser: 1,
    },
    {
      idProject: 3,
      projectName: "Edifício das Águas - Secretaria academica",
      projectDate: "2022-5-30",
      idUser: 2,
    },
    {
      idProject: 4,
      projectName: "Plantação da Serra",
      projectDate: "2022-2-26",
      idUser: 3,
    },
    {
      idProject: 5,
      projectName: "Sítio do Marcos",
      projectDate: "2021-10-13",
      idUser: 4,
    },
  ]);
}
