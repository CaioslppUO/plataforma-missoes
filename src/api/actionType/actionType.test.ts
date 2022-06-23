import { knex } from "knex";
import { ActionType } from "./actionType";
const config = require("../../../knexfile");

describe("Test the action database operations", () => {
  const database = knex(config.development);
  const actionType = ActionType(database);

  test("Should insert a actionType", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from ActionType ORDER BY id DESC LIMIT 1;"
    );
    let res = await actionType
      .insert(
        {
          actionName: "New ActionType",
          actionDescription: "This is an action type example",
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(tblLastIndex[0].id + 1);
  });

  test("Should remove a actionType", async () => {
    let res = await actionType
      .remove(2, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should get all actionTypes", async () => {
    let size = await database.raw("SELECT COUNT(*) AS total FROM ActionType;");
    let res = await actionType
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(res.length).toBe(size[0].total);
    expect(Object.keys(res[0]).sort()).toEqual(
      ["id", "actionName", "actionDescription"].sort()
    );
  });

  test("Should get a actionType", async () => {
    let res = await actionType
      .findOne(2)
      .then((res) => res)
      .catch((err) => err);
    expect(Object.keys(res).sort()).toEqual(
      ["id", "actionName", "actionDescription"].sort()
    );
  });

  test("Should update a actionType", async () => {
    let res = await actionType
      .update(
        2,
        {
          actionName: "New Action Type Update",
          actionDescription: "Action Typ Description Update",
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should not insert an actionType with empty name", async () => {
    let res = await actionType
      .insert(
        {
          actionName: "",
          actionDescription: "Empty Name Action Type Description",
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid action type name");
  });

  test("Should not insert an actionType with empty description", async () => {
    let res = await actionType
      .insert(
        {
          actionName: "Empty Description Action Type",
          actionDescription: "",
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid action type description");
  });
});
