import { knex } from "knex";
import { Mission } from "./mission";
const config = require("../../../knexfile");

describe("Test the mission database operations", () => {
  const database = knex(config.development);
  const mission = Mission();

  test("Should insert a mission", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Mission ORDER BY id DESC LIMIT 1;"
    );
    let res = await mission.insert({
      missionName: "New Mission",
      missionOrder: 2,
      idProject: 5,
    });
    expect(res).toBe(tblLastIndex[0].id + 1);
  });

  test("Should remove a mission", async () => {
    let res = await mission
      .remove(2, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toEqual([]);
  });

  test("Should get all missions", async () => {
    let size = await database.raw("SELECT COUNT(*) AS total FROM Mission;");
    let res = await mission
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(res.length).toBe(size[0].total);
    expect(Object.keys(res[0]).sort()).toEqual(
      ["id", "missionName", "missionOrder", "idProject"].sort()
    );
  });

  test("Should get a mission", async () => {
    let res = await mission
      .findOne(2)
      .then((res) => res)
      .catch((err) => err);
    expect(Object.keys(res).sort()).toEqual(
      ["id", "missionName", "missionOrder", "idProject"].sort()
    );
  });

  test("Should get a mission by project", async () => {
    let size = await database.raw(
      "SELECT COUNT(*) AS total FROM Mission where idProject = 2;"
    );
    let res = await mission
      .findByProject(2)
      .then((res) => res)
      .catch((err) => err);
    expect(res.length).toBe(size[0].total);
    expect(Object.keys(res[0]).sort()).toEqual(
      ["id", "missionName", "missionOrder", "idProject"].sort()
    );
  });

  test("Should update a mission", async () => {
    let res = await mission
      .update(
        2,
        { missionName: "Updated Mission", missionOrder: 1, idProject: 2 },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toEqual([]);
  });

  test("Should not insert a mission with invalid project", async () => {
    let res = await mission
      .insert(
        {
          missionName: "Invalid Project Mission",
          missionOrder: 1,
          idProject: 99,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid project");
  });

  test("Should not insert a mission with invalid mission order", async () => {
    let res = await mission
      .insert(
        {
          missionName: "Invalid Mission Order",
          missionOrder: -1,
          idProject: 2,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid mission order");
  });

  test("Should not insert a mission with empty name", async () => {
    let res = await mission
      .insert(
        {
          missionName: "",
          missionOrder: 1,
          idProject: 2,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid mission name");
  });
});
