import { CrudType } from "./crudInterface";
import { knex } from "knex";
const config = require("../../../knexfile");

const database = knex(config.development);

export const Crud = <ObjectModel>(): CrudType<ObjectModel> => {
  const insert = (
    table: string,
    data: ObjectModel,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      if (forceRollBack) {
        await database.transaction((t) => {
          t(table)
            .insert(data)
            .then((res) => {
              t.rollback();
              resolve(res[0]);
            })
            .catch((err) => {
              t.rollback();
              rejects({
                error: err.errno,
                code: err.code,
                message: err.message,
              });
            });
        });
      } else {
        await database(table)
          .insert(data)
          .then((res) => {
            resolve(res[0]);
          })
          .catch((err) => {
            rejects({ error: err.errno, code: err.code, message: err.message });
          });
      }
    });
  };

  const remove = (
    table: string,
    id: number,
    forceRollBack: boolean = false
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      if (forceRollBack) {
        await database.transaction((t) => {
          t.raw(`DELETE FROM ${table} where id=${id}`)
            .then((res) => {
              t.rollback();
              resolve(true);
            })
            .catch((err) => {
              t.rollback();
              rejects({
                error: err.errno,
                code: err.code,
                message: err.message,
              });
            });
        });
      } else {
        await database
          .raw(`DELETE FROM ${table} where id=${id}`)
          .then((res) => {
            resolve(true);
          })
          .catch((err) => {
            rejects({ error: err.errno, code: err.code, message: err.message });
          });
      }
    });
  };

  const findOne = (table: string, id: number): Promise<ObjectModel> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(`SELECT * FROM ${table} WHERE id=${id}`)
        .then((res) => {
          resolve(res[0]);
        })
        .catch((err) => {
          rejects({ error: err.errno, code: err.code, message: err.message });
        });
    });
  };

  const find = (table: string): Promise<ObjectModel[]> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(`SELECT * FROM ${table}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects({ error: err.errno, code: err.code, message: err.message });
        });
    });
  };

  const update = (
    table: string,
    id: number,
    data: ObjectModel,
    forceRollBack?: boolean
  ): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      if (forceRollBack) {
        await database.transaction((t) => {
          t(table)
            .update(data)
            .where("id", "=", id)
            .then(() => {
              t.rollback();
              resolve(true);
            })
            .catch((err) => {
              t.rollback();
              rejects({
                error: err.errno,
                code: err.code,
                message: err.message,
              });
            });
        });
      } else {
        await database(table)
          .update(data)
          .where("id", "=", id)
          .then(() => {
            resolve(true);
          })
          .catch((err) => {
            rejects({ error: err.errno, code: err.code, message: err.message });
          });
      }
    });
  };

  return {
    insert,
    remove,
    findOne,
    find,
    update,
  };
};
