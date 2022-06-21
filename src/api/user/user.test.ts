import { User } from "./user";
import { knex } from "knex";
const config = require("../../../knexfile");

describe("Test the user database operations", () => {
  const database = knex(config.development);
  const user = User(database);

  test("Shold insert a user", async () => {
    let last = await database.raw(
      "SELECT id from User ORDER BY id DESC LIMIT 1;"
    );
    let res = await user
      .insert("New Name", "newemail@gmail.com", true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(last[0].id + 1);
  });

  test("Should remove a user", async () => {
    let res = await user
      .remove(1, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should get a user", async () => {
    let res = await user
      .findOne(1)
      .then((res) => res)
      .catch((err) => err);
    expect(Object.keys(res).sort()).toEqual(["userName", "email", "id"].sort());
  });

  test("Should get all users", async () => {
    let size = await database.raw("SELECT COUNT(*) AS total FROM User;");
    let res = await user
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(size[0].total).toBe(res.length);
    expect(Object.keys(res[0]).sort()).toEqual(
      ["userName", "email", "id"].sort()
    );
  });
});
