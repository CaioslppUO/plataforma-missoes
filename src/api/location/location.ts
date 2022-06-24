import {
  LocationType,
  LocationModel,
  LocationModelExtended,
} from "./locationInterface";
import { Crud } from "../data/crud";
import { Mission } from "../mission/mission";
import { Action } from "../action/action";

export const Location = (): LocationType => {
  const crud = Crud<LocationModel>();

  const insert = (
    location: LocationModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      if (location.locationOrder <= 0) rejects("invalid location order");
      await Mission()
        .findOne(location.idMission)
        .then((res) => {
          if (res == undefined) rejects("invalid mission");
        })
        .catch((err) => {
          rejects("invalid mission");
        });
      await crud
        .insert("Location", location, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const remove = (id: number, forceRollBack?: boolean): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      let action = Action();
      await action.find().then(async (actions) => {
        for (let i = 0; i < actions.length; i++) {
          if (actions[i].location.id == id && actions[i].id != undefined) {
            await action.remove(Number(actions[i].id), forceRollBack);
          }
        }
      });
      await crud
        .remove("Location", id, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const find = (): Promise<LocationModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Location")
        .then(async (locations) => {
          let res: LocationModelExtended[] = [];
          let mission = Mission();
          for (let i = 0; i < locations.length; i++) {
            await mission
              .findOne(locations[i].idMission)
              .then((mission) => {
                res.push({
                  id: locations[i].id,
                  latitude: locations[i].latitude,
                  longitude: locations[i].longitude,
                  locationOrder: locations[i].locationOrder,
                  mission: mission,
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

  const findOne = (id: number): Promise<LocationModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Location", id)
        .then(async (location) => {
          if (location == undefined) rejects("invalid location id");
          await Mission()
            .findOne(location.idMission)
            .then((mission) => {
              resolve({
                id: location.id,
                latitude: location.latitude,
                longitude: location.longitude,
                locationOrder: location.locationOrder,
                mission: mission,
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
    location: LocationModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      // Verifying if location exists.
      await crud
        .findOne("Location", id)
        .then((res) => {
          if (res == undefined) rejects("invalid location id");
        })
        .catch((err) => {
          rejects(err);
        });
      // Verifying if mission exists.
      await Mission()
        .findOne(location.idMission)
        .then((res) => {
          if (res == undefined) rejects("invalid mission");
        })
        .catch((err) => {
          rejects("invalid mission");
        });

      await crud
        .update("Location", id, location, forceRollBack)
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
