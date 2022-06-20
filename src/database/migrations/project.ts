import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("Project", (tbl) => {
    tbl.increments("idProject", { primaryKey: true }).notNullable();
    tbl.string("projectName", 255).notNullable();
    tbl.date("projectDate").notNullable();
    tbl
      .integer("idUser")
      .unsigned()
      .index()
      .notNullable()
      .references("idUser")
      .inTable("User");
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("Project");
};
