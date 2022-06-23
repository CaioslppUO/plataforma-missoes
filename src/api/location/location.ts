import {
  LocationType,
  LocationModel,
  LocationModelExtended,
} from "./locationInterface";
import { Crud } from "../data/crud";
import { Knex } from "knex";
import { Mission } from "../mission/mission";

export const Location = (): LocationType => {
  const crud = Crud<LocationModel>();

  const insert = (
    location: LocationModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
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

  const remove = (id: number, forceRollBack?: boolean): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
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
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
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
