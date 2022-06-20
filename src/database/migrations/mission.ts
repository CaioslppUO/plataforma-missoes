import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("Mission", (tbl) => {
    tbl.increments("id", { primaryKey: true }).notNullable();
    tbl.integer("missionOrder").notNullable();
    tbl.string("missionName", 45).notNullable();
    tbl
      .integer("idProject")
      .unsigned()
      .index()
      .notNullable()
      .references("id")
      .inTable("Project");
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("Mission");
};
