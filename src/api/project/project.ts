import {
  ProjectType,
  ProjectModel,
  ProjectModelExtended,
} from "./projectInterface";
import { User } from "../user/user";
import { Crud } from "../data/crud";
import { Mission } from "../mission/mission";

export const Project = (): ProjectType => {
  const crud = Crud<ProjectModel>();

  const insert = (
    project: ProjectModel,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await User()
        .findOne(project.idUser)
        .then((res) => {
          if (res == undefined) rejects("invalid user id");
        })
        .catch(() => {
          rejects("invalid user id");
        });
      let year = project.projectDate.split("-")[0];
      let month = project.projectDate.split("-")[1];
      let day = project.projectDate.split("-")[2];
      if (
        year.length != 4 ||
        month.length != 2 ||
        day.length != 2 ||
        Number(month) > 12 ||
        Number(month) <= 0 ||
        Number(day) > 31 ||
        Number(day) <= 0
      )
        rejects("invalid date");
      if (project.projectName.length <= 0) rejects("invalid project name");
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
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      let mission = Mission();
      await mission.find().then(async (missions) => {
        for (let i = 0; i < missions.length; i++) {
          if (missions[i].project.id == id && missions[i].id != undefined) {
            await mission.remove(Number(missions[i].id), forceRollBack);
          }
        }
      });
      await crud
        .remove("Project", id, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<ProjectModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Project", id)
        .then(async (project) => {
          if (project == undefined) rejects("invalid project id");
          await User()
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
            await User()
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
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Project", id)
        .then((res) => {
          if (res == undefined) rejects("invalid project id");
        })
        .catch((err) => {
          rejects(err);
        });
      await User()
        .findOne(project.idUser)
        .then((res) => {
          if (res == undefined) rejects("invalid user id");
        })
        .catch(() => {
          rejects("invalid user id");
        });
      let year = project.projectDate.split("-")[0];
      let month = project.projectDate.split("-")[1];
      let day = project.projectDate.split("-")[2];
      if (
        year.length != 4 ||
        month.length != 2 ||
        day.length != 2 ||
        Number(month) > 12 ||
        Number(month) <= 0 ||
        Number(day) > 31 ||
        Number(day) <= 0
      )
        rejects("invalid date");
      if (project.projectName.length <= 0) rejects("invalid project name");
      await crud
        .update("Project", id, project, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
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
