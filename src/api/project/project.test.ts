import { knex } from "knex";
const config = require("../../../knexfile");

import { Project } from "./project";
import { ProjectType, ProjectModel } from "./projectInterface";

describe("Test the project database operations", () => {
  const database = knex(config.development);
  const project = Project(database);

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
    expect(res).toBe(true);
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
    expect(res).toBe(true);
  });
});
