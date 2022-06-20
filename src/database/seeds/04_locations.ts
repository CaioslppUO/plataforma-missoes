import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Location").del();

  // Inserts seed entries
  await knex("Location").insert([
    {
      idLocation: 1,
      latitude: -29.012,
      longitude: -36.125,
      locationOrder: 1,
      idMission: 1,
    },
    {
      idLocation: 2,
      latitude: -29.524,
      longitude: -45.122,
      locationOrder: 2,
      idMission: 1,
    },
    {
      idLocation: 3,
      latitude: -25.524,
      longitude: -40.945,
      locationOrder: 3,
      idMission: 1,
    },
    {
      idLocation: 4,
      latitude: -30.224,
      longitude: -39.225,
      locationOrder: 1,
      idMission: 2,
    },
    {
      idLocation: 5,
      latitude: -24.222,
      longitude: -41.123,
      locationOrder: 1,
      idMission: 3,
    },
    {
      idLocation: 6,
      latitude: -32.555,
      longitude: -34.425,
      locationOrder: 1,
      idMission: 4,
    },
    {
      idLocation: 7,
      latitude: -26.111,
      longitude: -33.333,
      locationOrder: 1,
      idMission: 5,
    },
    {
      idLocation: 8,
      latitude: -24.224,
      longitude: -42.422,
      locationOrder: 1,
      idMission: 5,
    },
    {
      idLocation: 9,
      latitude: -30.0,
      longitude: -49.499,
      locationOrder: 2,
      idMission: 5,
    },
    {
      idLocation: 10,
      latitude: -29.999,
      longitude: -43.444,
      locationOrder: 3,
      idMission: 5,
    },
  ]);
}
