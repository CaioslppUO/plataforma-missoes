import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("Action", (tbl) => {
    tbl.increments("id", { primaryKey: true }).notNullable();
    tbl
      .integer("idLocation")
      .unsigned()
      .index()
      .notNullable()
      .references("id")
      .inTable("Location");
    tbl
      .integer("idActionType")
      .unsigned()
      .index()
      .notNullable()
      .references("id")
      .inTable("ActionType");
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("Action");
};
