import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("User", (tbl) => {
    tbl.increments("id", { primaryKey: true }).notNullable();
    tbl.string("userName", 255).notNullable();
    tbl.string("email", 255).notNullable().unique();
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("User");
};
