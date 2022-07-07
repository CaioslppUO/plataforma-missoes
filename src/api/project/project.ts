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
          console.log("caiu aqui");
          if (res == undefined) return rejects("invalid user id");
        })
        .catch(() => {
          return rejects("invalid user id");
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
        return rejects("invalid date");
      if (project.projectName.length <= 0)
        return rejects("invalid project name");
      await crud
        .insert("Project", project, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
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
          if (missions[i].idProject == id && missions[i].id != undefined) {
            await mission.remove(Number(missions[i].id), forceRollBack);
          }
        }
      });
      await crud
        .remove("Project", id, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<ProjectModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Project", id)
        .then(async (project) => {
          if (project == undefined) return rejects("invalid project id");
          let missions = await Mission().find();
          let specificMissions = [];
          for (let j = 0; j < missions.length; j++) {
            if (missions[j].idProject == id) {
              specificMissions.push(missions[j]);
            }
          }
          let user = await User().findOne(project.idUser);
          let res: ProjectModelExtended = {
            id: project.id,
            projectName: project.projectName,
            projectDate: project.projectDate,
            user: {
              id: user.id,
              userName: user.userName,
              email: user.email,
              firebaseId: user.firebaseId,
            },
            missions: specificMissions,
          };
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const find = (): Promise<ProjectModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Project")
        .then(async (projects) => {
          let res: ProjectModelExtended[] = [];
          let missions = await Mission().find();
          let specificMissions = [];
          for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < missions.length; j++) {
              if (missions[j].idProject == projects[i].id) {
                specificMissions.push(missions[j]);
              }
            }
            let user = await User().findOne(projects[i].idUser);
            res.push({
              id: projects[i].id,
              projectName: projects[i].projectName,
              projectDate: projects[i].projectDate,
              user: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                firebaseId: user.firebaseId,
              },
              missions: specificMissions,
            });
            specificMissions = [];
          }
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const findByUser = (id: number): Promise<ProjectModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Project")
        .then(async (projects) => {
          let res: ProjectModelExtended[] = [];
          let missions = await Mission().find();
          let specificMissions = [];
          for (let i = 0; i < projects.length; i++) {
            if (projects[i].idUser == id) {
              for (let j = 0; j < missions.length; j++) {
                if (missions[j].idProject == projects[i].id) {
                  specificMissions.push(missions[j]);
                }
              }
              let user = await User().findOne(projects[i].idUser);
              res.push({
                id: projects[i].id,
                projectName: projects[i].projectName,
                projectDate: projects[i].projectDate,
                user: {
                  id: user.id,
                  userName: user.userName,
                  email: user.email,
                  firebaseId: user.firebaseId,
                },
                missions: specificMissions,
              });
            }
            specificMissions = [];
          }
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
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
          if (res == undefined) return rejects("invalid project id");
        })
        .catch((err) => {
          return rejects(err);
        });
      await User()
        .findOne(project.idUser)
        .then((res) => {
          if (res == undefined) return rejects("invalid user id");
        })
        .catch(() => {
          return rejects("invalid user id");
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
        return rejects("invalid date");
      if (project.projectName.length <= 0) rejects("invalid project name");
      await crud
        .update("Project", id, project, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  return {
    insert,
    remove,
    findOne,
    find,
    findByUser,
    update,
  };
};
