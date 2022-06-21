import { Knex } from "knex";
import { Crud } from "../data/crud";
import { UserType, UserModel } from "./userInterface";

export const User = (database: Knex<any, unknown[]>): UserType => {
  const crud = Crud(database);

  const insert = (
    userName: string,
    email: string,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .insert<UserModel>("User", { userName, email }, forceRollBack)
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
        .remove("User", id, forceRollBack)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const findOne = (id: number): Promise<Object> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .findOne("User", 1)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const find = (): Promise<Object[]> => {
    return new Promise(async (resolve, rejects) => {
      await crud
        .find("User")
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
    findOne,
    find,
  };
};
