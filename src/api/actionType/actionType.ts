import { ActionTypeType, ActionTypeModel } from "./actionTypeInterface";
import { Crud } from "../data/crud";
import { Knex } from "knex";

export const ActionType = (database: Knex<any, unknown[]>): ActionTypeType => {
  const crud = Crud<ActionTypeModel>(database);

  const insert = (
    actionType: ActionTypeModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      if (actionType.actionName.length <= 0)
        rejects("invalid action type name");
      if (actionType.actionDescription.length <= 0)
        rejects("invalid action type description");
      await crud
        .insert("ActionType", actionType, forceRollBack)
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
        .remove("ActionType", id, forceRollBack)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const find = (): Promise<ActionTypeModel[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("ActionType")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<ActionTypeModel> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("ActionType", id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const update = (
    id: number,
    actionType: ActionTypeModel,
    forceRollBack?: boolean
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .update("ActionType", id, actionType, forceRollBack)
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
