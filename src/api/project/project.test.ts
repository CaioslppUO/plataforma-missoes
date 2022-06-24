import { knex } from "knex";
import { Project } from "./project";
const config = require("../../../knexfile");

describe("Test the project database operations", () => {
  const database = knex(config.development);
  const project = Project();

  test("Should insert a project", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Project ORDER BY id DESC LIMIT 1;"
    );
    let res = await project
      .insert(
        {
          projectName: "New Project Name",
          projectDate: "2022-06-23",
          idUser: 1,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(tblLastIndex[0].id + 1);
  });

  test("Should delete a project", async () => {
    let res = await project
      .remove(1, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toEqual([]);
  });

  test("Should get a project", async () => {
    let res = await project
      .findOne(1)
      .then((res) => res)
      .catch((err) => err);
    expect(Object.keys(res).sort()).toEqual(
      ["id", "projectName", "projectDate", "user"].sort()
    );
  });

  test("Should get all projects", async () => {
    let size = await database.raw("SELECT COUNT(*) AS total FROM Project;");
    let res = await project
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(res.length).toBe(size[0].total);
    expect(Object.keys(res[0]).sort()).toEqual(
      ["id", "projectName", "projectDate", "user"].sort()
    );
  });

  test("Should update a project", async () => {
    let res = await project.update(
      1,
      {
        projectName: "Updated Project Name",
        projectDate: "2022-05-12",
        idUser: 5,
      },
      true
    );
    expect(res).toBe(1);
  });

  test("Should not insert a project with invalid user", async () => {
    let res = await project
      .insert(
        {
          projectName: "Invalid User Project Name",
          projectDate: "2022-03-12",
          idUser: 35,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid user id");
  });

  test("Should not insert a project with invalid date", async () => {
    let res = await project
      .insert(
        {
          projectName: "Invalid Date Project Name",
          projectDate: "2022-15-05",
          idUser: 2,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid date");
  });

  test("Should not insert a project with empty date", async () => {
    let res = await project
      .insert(
        {
          projectName: "Invalid Date Project Name",
          projectDate: "",
          idUser: 2,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid date");
  });

  test("Should not insert a project with empty name", async () => {
    let res = await project
      .insert(
        {
          projectName: "",
          projectDate: "2022-06-05",
          idUser: 2,
        },
        true
      )
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe("invalid project name");
  });
});
