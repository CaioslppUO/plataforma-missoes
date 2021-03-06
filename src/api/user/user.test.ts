import { knex } from "knex";
const config = require("../../../knexfile");
import { User } from "./user";
import { UserModel } from "./userInterface";

describe("Test the user database operations", () => {
  const database = knex(config.development);
  const user = User();

  test("Should insert a user", async () => {
    let last = await database.raw(
      "SELECT id from User ORDER BY id DESC LIMIT 1;"
    );
    let res = await user
      .insert(
        "New Name",
        "newemail@gmail.com",
        "ajskBFiab12irb!@IBASkjfh",
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(last[0].id + 1);
  });

  test("Should remove a user", async () => {
    let res = await user
      .remove(1, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toEqual([]);
  });

  test("Should get a user", async () => {
    let res = await user
      .findOne(1)
      .then((res) => res)
      .catch((err) => err);
    expect(Object.keys(res).sort()).toEqual(
      ["userName", "email", "id", "firebaseId"].sort()
    );
  });

  test("Should get all users", async () => {
    let size = await database.raw("SELECT COUNT(*) AS total FROM User;");
    let res = await user
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(size[0].total).toBe(res.length);
    expect(Object.keys(res[0]).sort()).toEqual(
      ["userName", "email", "id", "firebaseId"].sort()
    );
  });

  test("Should update a user", async () => {
    let res = await user
      .update(
        1,
        {
          userName: "Updated Name",
          email: "updatedemail@gmail.com",
          firebaseId: "askjfnaskjnQ2K;:lqntowntfrqoi:@#",
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toEqual([]);
  });

  test("Should not insert a user with duplicated email", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Location ORDER BY id DESC LIMIT 1;"
    );
    let res = await user
      .insert(
        "Duplicated Email",
        "caioslppuo@gmail.com",
        "@@@AKJSBGFi;1qbAKSJBF",
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).not.toBe(tblLastIndex[0].id + 1);
  });

  test("Should not insert a user with empty user name", async () => {
    let res = await user
      .insert("", "emailemailemail@gmail.com", "AJKSBfakJB@K!B@IRABJKF", true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid user name");
  });

  test("Should not insert a user with invalid email", async () => {
    let res = await user
      .insert(
        "Name for Error Email",
        "@gmail.com",
        "asjkfnkj12:KW!KJBRAKJWSFk",
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid user email");
  });

  test("Should return an error if firebaseid is not found", async () => {
    let res = await user
      .getIdByFirebaseId("invalid_firebase_id")
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid firebase id");
  });
});
