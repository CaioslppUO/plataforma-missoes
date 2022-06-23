import { knex } from "knex";
import { Location } from "./location";
const config = require("../../../knexfile");

describe("Test the mission database operations", () => {
  const database = knex(config.development);
  const location = Location(database);

  test("Should insert a location", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Location ORDER BY id DESC LIMIT 1;"
    );
    let res = await location
      .insert(
        {
          idMission: 1,
          latitude: -25.222,
          longitude: -40.333,
          locationOrder: 1,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(tblLastIndex[0].id + 1);
  });

  test("Should remove a location", async () => {
    let res = await location
      .remove(2, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should get all locations", async () => {
    let size = await database.raw("SELECT COUNT(*) AS total FROM Location;");
    let res = await location
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(res.length).toBe(size[0].total);
    expect(Object.keys(res[0]).sort()).toEqual(
      ["id", "latitude", "longitude", "locationOrder", "mission"].sort()
    );
  });

  test("Should get a location", async () => {
    let res = await location
      .findOne(2)
      .then((res) => res)
      .catch((err) => err);
    expect(Object.keys(res).sort()).toEqual(
      ["id", "latitude", "longitude", "locationOrder", "mission"].sort()
    );
  });

  test("Should update a location", async () => {
    let res = await location
      .update(
        2,
        {
          latitude: -25.005,
          longitude: -35.221,
          locationOrder: 2,
          idMission: 3,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should not insert a location with invalid idMission", async () => {
    let res = await location
      .insert(
        {
          idMission: 99,
          latitude: -25.222,
          longitude: -40.333,
          locationOrder: 1,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid mission");
  });
});
