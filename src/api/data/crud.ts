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
              return resolve(res[0]);
            })
            .catch((err) => {
              t.rollback();
              return rejects({
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
            return resolve(res[0]);
          })
          .catch((err) => {
            return rejects({
              error: err.errno,
              code: err.code,
              message: err.message,
            });
          });
      }
    });
  };

  const remove = (
    table: string,
    id: number,
    forceRollBack: boolean = false
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      if (forceRollBack) {
        await database.transaction((t) => {
          t.raw(`DELETE FROM ${table} where id=${id}`)
            .then((res) => {
              t.rollback();
              return resolve(res);
            })
            .catch((err) => {
              t.rollback();
              return rejects({
                error: err.errno,
                code: err.code,
                message: err.message,
              });
            });
        });
      } else {
        await database(table)
          .where({ id: id })
          .del()
          .then((res) => {
            return resolve(res);
          })
          .catch((err) => {
            return rejects({
              error: err.errno,
              code: err.code,
              message: err.message,
            });
          });
      }
    });
  };

  const findOne = (table: string, id: number): Promise<ObjectModel> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(`SELECT * FROM ${table} WHERE id='${id}'`)
        .then((res) => {
          return resolve(res[0]);
        })
        .catch((err) => {
          return rejects({
            error: err.errno,
            code: err.code,
            message: err.message,
          });
        });
    });
  };

  const find = (table: string): Promise<ObjectModel[]> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(`SELECT * FROM ${table}`)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects({
            error: err.errno,
            code: err.code,
            message: err.message,
          });
        });
    });
  };

  const findBy = (
    table: string,
    id: number,
    targetCol: string
  ): Promise<ObjectModel[]> => {
    return new Promise(async (resolve, rejects) => {
      await database
        .raw(`SELECT * FROM ${table} WHERE ${targetCol}=${id}`)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return rejects({
            error: err.errno,
            code: err.code,
            message: err.message,
          });
        });
    });
  };

  const update = (
    table: string,
    id: number,
    data: ObjectModel,
    forceRollBack?: boolean
  ): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      let keys = Object.keys(data);
      let values = Object.values(data);
      let sql = `UPDATE ${table} SET `;
      for (let i = 0; i < keys.length; i++) {
        sql += `${keys[i]} = '${values[i]}'`;
        if (i != keys.length - 1) sql += ", ";
      }
      sql += ` WHERE id=${id}`;

      if (forceRollBack) {
        await database.transaction((t) => {
          t.raw(sql)
            .then((res) => {
              t.rollback();
              return resolve(res);
            })
            .catch((err) => {
              t.rollback();
              return rejects({
                error: err.errno,
                code: err.code,
                message: err.message,
              });
            });
        });
      } else {
        await database
          .raw(sql)
          .then((res) => {
            return resolve(res);
          })
          .catch((err) => {
            return rejects({
              error: err.errno,
              code: err.code,
              message: err.message,
            });
          });
      }
    });
  };

  const findIdByFirebaseId = (firebaseId: string): Promise<number> => {
    return new Promise(async (resolve, rejects) => {
      let res = await database
        .raw(`SELECT id FROM User WHERE firebaseId='${firebaseId}';`)
        .catch((err) => {
          return rejects(err);
        });
      if (res.length === 0) return rejects("invalid firebase id");
      return resolve(res[0].id);
    });
  };

  const wipeDatabase = (): Promise<boolean> => {
    return new Promise(async (resolve, rejects) => {
      try {
        await database.raw("DELETE FROM User;");
        await database.raw("DELETE FROM Project;");
        await database.raw("DELETE FROM Mission;");
        await database.raw("DELETE FROM Location;");
        await database.raw("DELETE FROM Action;");
        return resolve(true);
      } catch (err) {
        return rejects(err);
      }
    });
  };

  return {
    findBy,
    insert,
    remove,
    findOne,
    find,
    update,
    findIdByFirebaseId,
    wipeDatabase,
  };
};
