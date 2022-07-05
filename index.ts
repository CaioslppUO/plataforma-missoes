import * as fs from "fs";
import { knex } from "knex";

require("dotenv").config();
const app = require("express")();
const server = require("http").Server(app);
const cors = require("cors");
const morgan = require("morgan");

// Server Port
const port = process.env.PORT || 3333;

// Importing routes
import * as userRoute from "./src/routes/user";
import * as projectRoute from "./src/routes/project";
import * as missionRoute from "./src/routes/mission";
import * as locationRoute from "./src/routes/location";
import * as actionTypeRoute from "./src/routes/actionType";
import * as actionRoute from "./src/routes/action";

// Initialize the database and populate it.
const initialize_db = (wipe_db: boolean, populate: boolean): Promise<void> => {
  const config = require("./knexfile");
  const database = knex(config.development);

  return new Promise(async (resolve) => {
    if (!fs.existsSync(__dirname + "/src/database/test.sqlite3")) {
      await database.migrate.latest();
    }
    if (populate) {
      await database.seed.run();
    }
    resolve();
  });
};

// Setup Routes
initialize_db(false, false).then(() => {
  const apiRoute = "/api";
  app.use(cors());
  app.use(morgan("dev"));

  // User routes
  app.use(apiRoute, userRoute.router);

  // Project routes
  app.use(apiRoute, projectRoute.router);

  // Mission routes
  app.use(apiRoute, missionRoute.router);

  // LocationRoute routes
  app.use(apiRoute, locationRoute.router);

  // ActionType routes
  app.use(apiRoute, actionTypeRoute.router);

  // Action routes
  app.use(apiRoute, actionRoute.router);

  server.listen(port, () => {
    console.log(`Listening on :${port}`);
  });
});
