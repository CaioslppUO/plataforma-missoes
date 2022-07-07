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
          if (res == undefined) return rejects("invalid action type");
        })
        .catch(() => {
          return rejects("invalid action type");
        });
      await Location()
        .findOne(action.idLocation)
        .then((res) => {
          if (res == undefined) return rejects("invalid location");
        })
        .catch(() => {
          return rejects("invalid location");
        });
      await crud
        .insert("Action", action, forceRollBack)
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
      await crud
        .remove("Action", id, forceRollBack)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<ActionModelExtended> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("Action", id)
        .then(async (action) => {
          if (action == undefined) return rejects("invalid action id");
          await ActionType()
            .findOne(action.idActionType)
            .then(async (actionType) => {
              return resolve({
                id: action.id,
                actionType: actionType,
                idLocation: action.idLocation,
              });
            })
            .catch((err) => {
              return rejects(err);
            });
        })
        .catch((err) => {
          return rejects(err);
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
          for (let i = 0; i < actions.length; i++) {
            await actionType
              .findOne(actions[i].idActionType)
              .then((actionType) => {
                res.push({
                  id: actions[i].id,
                  actionType: actionType,
                  idLocation: actions[i].idLocation,
                });
              })
              .catch((err) => {
                return rejects(err);
              });
          }
          return resolve(res);
        })
        .catch((err) => {
          return rejects(err);
        });
    });
  };

  const findByLocation = (id: number): Promise<ActionModelExtended[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findBy("Action", id, "idLocation")
        .then(async (actions) => {
          if (actions == undefined) return rejects("invalid mission id");
          let res: ActionModelExtended[] = [];
          let actionType = ActionType();
          for (let i = 0; i < actions.length; i++) {
            await actionType
              .findOne(actions[i].idActionType)
              .then((actionType) => {
                res.push({
                  id: actions[i].id,
                  actionType: actionType,
                  idLocation: actions[i].idLocation,
                });
              })
              .catch((err) => {
                return rejects(err);
              });
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
    action: ActionModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      // Verifying if the action exists.
      await crud
        .findOne("Action", id)
        .then((res) => {
          if (res == undefined) return rejects("invalid action id");
        })
        .catch((err) => {
          return rejects(err);
        });

      // Verifying if the actionType exists.
      await ActionType()
        .findOne(action.idActionType)
        .then((res) => {
          if (res == undefined) return rejects("invalid action type");
        })
        .catch(() => {
          return rejects("invalid action type");
        });

      // Verifying if the location exists.
      await Location()
        .findOne(action.idLocation)
        .then((res) => {
          if (res == undefined) return rejects("invalid location");
        })
        .catch(() => {
          return rejects("invalid location");
        });

      // Updating the action
      await crud
        .update("Action", id, action, forceRollBack)
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
    findByLocation,
    remove,
    find,
    findOne,
    update,
  };
};
