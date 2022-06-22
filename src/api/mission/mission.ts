import {
  MissionType,
  MissionModel,
  MissionModelExtended,
} from "./missionInterface";
import { Crud } from "../data/crud";
import { Project } from "../project/project";
import { Knex } from "knex";

export const Mission = (database: Knex<any, unknown[]>): MissionType => {
  const crud = Crud<MissionModel>(database);

  const insert = (
    mission: MissionModel,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
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
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .remove("Mission", 2, true)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          rejects(false);
        });
    });
  };

  const find = (): Promise<MissionModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Mission")
        .then(async (missions) => {
          let res: MissionModelExtended[] = [];
          let project = Project(database);
          for (let i = 0; i < missions.length; i++) {
            await project
              .findOne(missions[i].idProject)
              .then((project) => {
                res.push({
                  id: missions[0].id,
                  missionName: missions[0].missionName,
                  missionOrder: missions[0].missionOrder,
                  project: project,
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

  const findOne = (id: number): Promise<MissionModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Mission", id)
        .then((mission) => {
          Project(database)
            .findOne(mission.idProject)
            .then((project) => {
              resolve({
                id: mission.id,
                missionName: mission.missionName,
                missionOrder: mission.missionOrder,
                project: project,
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

  const update = (
    id: number,
    mission: MissionModel,
    forceRollBack: boolean = false
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
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
    insert,
    remove,
    find,
    findOne,
    update,
  };
};