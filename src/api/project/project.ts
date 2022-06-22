import {
  ProjectType,
  ProjectModel,
  ProjectModelExtended,
} from "./projectInterface";
import { Knex } from "knex";
import { User } from "../user/user";
import { Crud } from "../data/crud";

export const Project = (database: Knex<any, unknown[]>): ProjectType => {
  const crud = Crud<ProjectModel>(database);

  const insert = (
    project: ProjectModel,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .insert("Project", project, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const remove = (
    id: number,
    forceRollBack: boolean = false
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .remove("Project", id, forceRollBack)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          rejects(false);
        });
    });
  };

  const findOne = (id: number): Promise<ProjectModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Project", id)
        .then((project) => {
          User(database)
            .findOne(project.idUser)
            .then((user) => {
              let res: ProjectModelExtended = {
                id: project.id,
                projectName: project.projectName,
                projectDate: project.projectDate,
                user: {
                  id: user.id,
                  userName: user.userName,
                  email: user.email,
                },
              };
              resolve(res);
            })
            .catch((err) => {
              rejects(err);
            });
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const find = (): Promise<ProjectModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Project")
        .then(async (projects) => {
          let res: ProjectModelExtended[] = [];
          for (let i = 0; i < projects.length; i++) {
            await User(database)
              .findOne(projects[i].idUser)
              .then((user) => {
                res.push({
                  id: projects[i].id,
                  projectName: projects[i].projectName,
                  projectDate: projects[i].projectDate,
                  user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                  },
                });
              })
              .catch((err) => {
                rejects(err);
              });
          }
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const update = (
    id: number,
    project: ProjectModel,
    forceRollBack: boolean = false
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .update("Project", id, project, forceRollBack)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          rejects(false);
        });
    });
  };

  return {
    insert,
    remove,
    findOne,
    find,
    update,
  };
};
