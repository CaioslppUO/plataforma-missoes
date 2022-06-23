require("dotenv").config();
import * as fs from "fs";
import { knex } from "knex";
const config = require("./knexfile");

const database = knex(config.development);

var app = require("express")();
var bodyParser = require("body-parser");
var server = require("http").Server(app);
var jsonParser = bodyParser.json();
const cors = require("cors");

const port = process.env.PORT || 3333;

// Importing routes
import * as userRoute from "./src/routes/user";

// Initialize the database and populate it.
const initialize_db = (wipe_db: boolean): Promise<void> => {
  return new Promise(async (resolve, rejects) => {
    if (!fs.existsSync(__dirname + "/src/database/test.sqlite3")) {
      await database.migrate.latest();
      await database.seed.run();
    }
    if (wipe_db) {
      await database.seed.run();
    }
    resolve();
  });
};

// Setup Routes
initialize_db(false).then(() => {
  app.use(cors());

  //app.get("/", jsonParser, (req: any, res: any) => {
  //  res.sendFile(__dirname + "/index.html");
  //});

  // User routes
  app.use("/api", userRoute.router);

  server.listen(port, () => {
    console.log(`Listening on :${port}`);
  });
});
