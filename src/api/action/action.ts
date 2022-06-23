import {
  ActionType as ACTIONTYPE,
  ActionModel,
  ActionModelExtended,
} from "./actionInterface";
import { Location } from "../location/location";
import { ActionType } from "../actionType/actionType";
import { Crud } from "../data/crud";
import { Knex } from "knex";

export const Action = (): ACTIONTYPE => {
  const crud = Crud<ActionModel>();

  const insert = (
    action: ActionModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await ActionType()
        .findOne(action.idActionType)
        .then((res) => {
          if (res == undefined) rejects("invalid action type");
        })
        .catch(() => {
          rejects("invalid action type");
        });
      await Location()
        .findOne(action.idLocation)
        .then((res) => {
          if (res == undefined) rejects("invalid location");
        })
        .catch(() => {
          rejects("invalid location");
        });
      await crud
        .insert("Action", action, forceRollBack)
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
        .remove("Action", id, forceRollBack)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          rejects(false);
        });
    });
  };

  const findOne = (id: number): Promise<ActionModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Action", id)
        .then(async (action) => {
          if (action == undefined) rejects("invalid action id");
          await ActionType()
            .findOne(action.idActionType)
            .then(async (actionType) => {
              await Location()
                .findOne(action.idLocation)
                .then((location) => {
                  resolve({
                    id: action.id,
                    actionType: actionType,
                    location: location,
                  });
                })
                .catch((err) => {
                  rejects(err);
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

  const find = (): Promise<ActionModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("Action")
        .then(async (actions) => {
          let res: ActionModelExtended[] = [];
          let actionType = ActionType();
          let location = Location();
          for (let i = 0; i < actions.length; i++) {
            await location
              .findOne(actions[i].idLocation)
              .then(async (location) => {
                await actionType
                  .findOne(actions[i].idActionType)
                  .then((actionType) => {
                    res.push({
                      id: actions[0].id,
                      actionType: actionType,
                      location: location,
                    });
                  })
                  .catch((err) => {
                    rejects(err);
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
    action: ActionModel,
    forceRollBack?: boolean
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Action", id)
        .then((res) => {
          if (res == undefined) rejects("invalid action id");
        })
        .catch((err) => {
          rejects(err);
        });
      await ActionType()
        .findOne(action.idActionType)
        .then((res) => {
          if (res == undefined) rejects("invalid action type");
        })
        .catch(() => {
          rejects("invalid action type");
        });
      await Location()
        .findOne(action.idLocation)
        .then((res) => {
          if (res == undefined) rejects("invalid location");
        })
        .catch(() => {
          rejects("invalid location");
        });
      await crud
        .update("Action", id, action, forceRollBack)
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
    find,
    findOne,
    update,
  };
};
