import { knex } from "knex";
import { Action } from "./action";
const config = require("../../../knexfile");

describe("Test the action database operations", () => {
  const database = knex(config.development);
  const action = Action();

  test("Should insert an action", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Action ORDER BY id DESC LIMIT 1;"
    );
    let res = await action
      .insert(
        {
          idActionType: 1,
          idLocation: 2,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(tblLastIndex[0].id + 1);
  });

  test("Should delete an action", async () => {
    let res = await action
      .remove(1, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should get an action", async () => {
    let res = await action
      .findOne(1)
      .then((res) => res)
      .catch((err) => err);
    expect(Object.keys(res).sort()).toEqual(
      ["id", "actionType", "location"].sort()
    );
  });

  test("Should get all actions", async () => {
    let size = await database.raw("SELECT COUNT(*) AS total FROM Project;");
    let res = await action
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(res.length).toBe(size[0].total);
    expect(Object.keys(res[0]).sort()).toEqual(
      ["id", "actionType", "location"].sort()
    );
  });

  test("Should update an action", async () => {
    let res = await action.update(
      1,
      {
        idActionType: 3,
        idLocation: 5,
      },
      true
    );
    expect(res).toBe(true);
  });

  test("Should not insert an action with invalid actionType", async () => {
    let res = await action
      .insert(
        {
          idActionType: 99,
          idLocation: 2,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid action type");
  });

  test("Should not insert an action with invalid location", async () => {
    let res = await action
      .insert(
        {
          idActionType: 1,
          idLocation: 99,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid location");
  });
});
