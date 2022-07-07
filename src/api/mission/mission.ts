import {
  MissionType,
  MissionModel,
  MissionModelExtended,
} from "./missionInterface";
import { Crud } from "../data/crud";
import { Project } from "../project/project";
import { Knex } from "knex";
import { Location } from "../location/location";

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
            return rejects("invalid project");
          }
        })
        .catch((err) => {
          return rejects("invalid project");
        });
      if (mission.missionOrder < 0) rejects("invalid mission order");
      if (mission.missionName.length <= 0) rejects("invalid mission name");
      await crud
        .insert("Mission", mission, forceRollBack)
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
      await crud
        .remove("Mission", id, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const find = (): Promise<MissionModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Mission")
        .then(async (missions) => {
          let res: MissionModelExtended[] = [];
          let currentMission;
          for (let i = 0; i < missions.length; i++) {
            currentMission = missions[i];
            if (currentMission.id) {
              let locations = await Location().findByMission(currentMission.id);
              res.push({
                id: missions[i].id,
                missionName: missions[i].missionName,
                missionOrder: missions[i].missionOrder,
                idProject: missions[i].idProject,
                locations: locations,
              });
            }
          }
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<MissionModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Mission", id)
        .then(async (mission) => {
          if (mission == undefined) return rejects("invalid mission id");
          if (mission.id) {
            let locations = await Location().findByMission(mission.id);
            return resolve({
              id: mission.id,
              missionName: mission.missionName,
              missionOrder: mission.missionOrder,
              idProject: mission.idProject,
              locations: locations,
            });
          }
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const findByProject = (id: number): Promise<MissionModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findBy("Mission", id, "idProject")
        .then(async (missions) => {
          if (missions == undefined) return rejects("invalid mission id");
          let res: MissionModelExtended[] = [];
          let currentMission;
          for (let i = 0; i < missions.length; i++) {
            currentMission = missions[i];
            if (currentMission.id) {
              let locations = await Location().findByMission(currentMission.id);
              res.push({
                id: missions[i].id,
                missionName: missions[i].missionName,
                missionOrder: missions[i].missionOrder,
                idProject: missions[i].idProject,
                locations: locations,
              });
            }
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
    mission: MissionModel,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      //Verifying if mission exists.
      await crud
        .findOne("Mission", id)
        .then((res) => {
          if (res == undefined) return rejects("invalid mission id");
        })
        .catch((err) => {
          return rejects(err);
        });

      // Verifying if projects exists.
      await Project()
        .findOne(mission.idProject)
        .then((res) => {
          if (res == undefined) {
            return rejects("invalid project");
          }
        })
        .catch((err) => {
          return rejects(err);
        });

      if (mission.missionOrder < 0) return rejects("invalid mission order");

      if (mission.missionName.length <= 0)
        return rejects("invalid mission name");

      await crud
        .update("Mission", id, mission, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
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
