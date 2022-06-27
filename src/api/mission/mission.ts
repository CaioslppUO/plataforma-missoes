import {
  MissionType,
  MissionModel,
  MissionModelExtended,
} from "./missionInterface";
import { Crud } from "../data/crud";
import { Project } from "../project/project";
import { Knex } from "knex";

export const Mission = (): MissionType => {
  const crud = Crud<MissionModel>();

  const insert = (
    mission: MissionModel,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await Project()
        .findOne(mission.idProject)
        .then((res) => {
          if (res == undefined) {
            rejects("invalid project");
          }
        })
        .catch((err) => {
          rejects("invalid project");
        });
      if (mission.missionOrder < 0) rejects("invalid mission order");
      if (mission.missionName.length <= 0) rejects("invalid mission name");
      await crud
        .insert("Mission", mission, forceRollBack)
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
      await crud
        .remove("Mission", id, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const find = (): Promise<MissionModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Mission")
        .then(async (missions) => {
          let res: MissionModelExtended[] = [];
          for (let i = 0; i < missions.length; i++) {
            res.push({
              id: missions[i].id,
              missionName: missions[i].missionName,
              missionOrder: missions[i].missionOrder,
              idProject: missions[i].idProject,
            });
          }
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<MissionModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Mission", id)
        .then(async (mission) => {
          if (mission == undefined) rejects("invalid mission id");
          await Project()
            .findOne(mission.idProject)
            .then((project) => {
              resolve({
                id: mission.id,
                missionName: mission.missionName,
                missionOrder: mission.missionOrder,
                idProject: project.id,
              });
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

  const findByProject = (id: number): Promise<MissionModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findBy("Mission", id, "idProject")
        .then(async (mission) => {
          if (mission == undefined) rejects("invalid mission id");
          resolve(mission);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const update = (
    id: number,
    mission: MissionModel,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      //Verifying if mission exists.
      await crud
        .findOne("Mission", id)
        .then((res) => {
          if (res == undefined) rejects("invalid mission id");
        })
        .catch((err) => {
          rejects(err);
        });

      // Verifying if projects exists.
      await Project()
        .findOne(mission.idProject)
        .then((res) => {
          if (res == undefined) {
            rejects("invalid project");
          }
        })
        .catch((err) => {
          rejects(err);
        });

      if (mission.missionOrder < 0) rejects("invalid mission order");

      if (mission.missionName.length <= 0) rejects("invalid mission name");

      await crud
        .update("Mission", id, mission, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  return {
    findByProject,
    insert,
    remove,
    find,
    findOne,
    update,
  };
};
