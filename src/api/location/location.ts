import {
  LocationType,
  LocationModel,
  LocationModelExtended,
} from "./locationInterface";
import { Crud } from "../data/crud";
import { Mission } from "../mission/mission";
import { Action } from "../action/action";
import { ActionModelExtended } from "../action/actionInterface";

export const Location = (): LocationType => {
  const crud = Crud<LocationModel>();

  const insert = (
    location: LocationModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      if (location.locationOrder <= 0) return rejects("invalid location order");
      await Mission()
        .findOne(location.idMission)
        .then((res) => {
          if (res == undefined) return rejects("invalid mission");
        })
        .catch((err) => {
          return rejects("invalid mission");
        });
      await crud
        .insert("Location", location, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const remove = (id: number, forceRollBack?: boolean): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      let action = Action();
      await action.find().then(async (actions) => {
        for (let i = 0; i < actions.length; i++) {
          if (actions[i].idLocation == id && actions[i].id != undefined) {
            await action.remove(Number(actions[i].id), forceRollBack);
          }
        }
      });
      await crud
        .remove("Location", id, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const find = (): Promise<LocationModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Location")
        .then(async (res: LocationModel[]) => {
          let locations: LocationModelExtended[] = [];
          let actions: ActionModelExtended[];
          for (let i = 0; i < res.length; i++) {
            let currentAction = res[i];
            if (currentAction.id != undefined) {
              actions = await Action().findByLocation(currentAction.id);
              locations.push({ ...res[i], actions: actions });
            } else return rejects("Undefined Location in database");
          }
          return resolve(locations);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const findByMission = (id: number): Promise<LocationModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findBy("Location", id, "idMission")
        .then(async (res) => {
          if (res == undefined) return rejects("invalid mission id");
          let locations: LocationModelExtended[] = [];
          let actions: ActionModelExtended[];
          for (let i = 0; i < res.length; i++) {
            let currentAction = res[i];
            if (currentAction.id != undefined) {
              actions = await Action().findByLocation(currentAction.id);
              locations.push({ ...res[i], actions: actions });
            } else return rejects("Undefined Location in database");
          }
          return resolve(locations);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<LocationModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Location", id)
        .then(async (res) => {
          if (res == undefined) return rejects("invalid location id");
          let locations: LocationModelExtended = res;
          let actions: ActionModelExtended[];
          if (res.id != undefined) {
            actions = await Action().findByLocation(res.id);
            locations.actions = actions;
          }
          return resolve(locations);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const update = (
    id: number,
    location: LocationModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      // Verifying if location exists.
      await crud
        .findOne("Location", id)
        .then((res) => {
          if (res == undefined) return rejects("invalid location id");
        })
        .catch((err) => {
          return rejects(err);
        });
      // Verifying if mission exists.
      await Mission()
        .findOne(location.idMission)
        .then((res) => {
          if (res == undefined) return rejects("invalid mission");
        })
        .catch((err) => {
          return rejects("invalid mission");
        });
      await crud
        .update("Location", id, location, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  return {
    findByMission,
    insert,
    remove,
    find,
    findOne,
    update,
  };
};
