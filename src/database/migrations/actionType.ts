import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("ActionType", (tbl) => {
    tbl.increments("idActionType", { primaryKey: true }).notNullable();
    tbl.string("actionName", 255).notNullable();
    tbl.string("actionDescription", 255).notNullable();
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("User");
};
