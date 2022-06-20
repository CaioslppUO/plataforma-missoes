require("dotenv").config();

import { knex, Knex } from "knex";
import { Crud } from "./src/api/data/crud";

const config = require("./knexfile");

let database: Knex<any, unknown[]>;

//Setting Up Database
if (process.env.DATABASE === "development") {
  database = knex(config.development);
} else {
  database = knex(config.production);
}

//let crud = Crud(database);
//
//const func = async () => {
//  try {
//    let id = await crud.insert("User", {
//      userName: "Teste",
//      email: "teste@gmail.com2",
//    });
//    console.log(id);
//  } catch (error) {
//    console.log(error);
//  }
//};
//
//func();
