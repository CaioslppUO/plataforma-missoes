import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("Location", (tbl) => {
    tbl.increments("id", { primaryKey: true }).notNullable();
    tbl.double("latitude", 3).notNullable();
    tbl.double("longitude", 3).notNullable();
    tbl.integer("locationOrder").notNullable();
    tbl
      .integer("idMission")
      .unsigned()
      .index()
      .notNullable()
      .references("id")
      .inTable("Mission");
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("Location");
};
