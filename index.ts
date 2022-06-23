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
import * as projectRoute from "./src/routes/project";
import * as missionRoute from "./src/routes/mission";
import * as locationRoute from "./src/routes/location";
import * as actionTypeRoute from "./src/routes/actionType";
import * as actionRoute from "./src/routes/action";

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
initialize_db(true).then(() => {
  app.use(cors());

  //app.get("/", jsonParser, (req: any, res: any) => {
  //  res.sendFile(__dirname + "/index.html");
  //});

  // User routes
  app.use("/api", userRoute.router);

  // Project routes
  app.use("/api", projectRoute.router);

  // Mission routes
  app.use("/api", missionRoute.router);

  // LocationRoute routes
  app.use("/api", locationRoute.router);

  // ActionType routes
  app.use("/api", actionTypeRoute.router);

  // Actione routes
  app.use("/api", actionRoute.router);

  server.listen(port, () => {
    console.log(`Listening on :${port}`);
  });
});
