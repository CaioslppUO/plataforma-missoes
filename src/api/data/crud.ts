import { CrudType } from "./crudInterface";
import { Knex } from "knex";

export const Crud = (database: Knex<any, unknown[]>): CrudType => {
  const insert = <type>(
    table: string,
    data: type,
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
              rejects(err);
            });
        });
      } else {
        await database(table)
          .insert(data)
          .then((res) => {
            resolve(res[0]);
          })
          .catch((err) => rejects(err));
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
              rejects(err);
            });
        });
      } else {
        await database
          .raw(`DELETE FROM ${table} where id=${id}`)
          .then((res) => {
            resolve(true);
          })
          .catch((err) => {
            rejects(err);
          });
      }
    });
  };

  const findOne = (table: string, id: number): Promise<Object> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(`SELECT * FROM ${table} WHERE id=${id}`)
        .then((res) => {
          resolve(res[0]);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const find = (table: string): Promise<Object[]> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(`SELECT * FROM ${table}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  };

  const update = <type>(
    table: string,
    id: number,
    data: type,
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
            .catch(() => {
              t.rollback();
              rejects(false);
            });
        });
      } else {
        await database(table)
          .update(data)
          .where("id", "=", id)
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            rejects(false);
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
