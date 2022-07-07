import * as fs from "fs";
import { knex } from "knex";
import { Crud } from "./src/api/data/crud";

require("dotenv").config();
const app = require("express")();
const server = require("http").Server(app);
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

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

  // Reset database route
  app.post("/wipe", jsonParser, (req: any, res: any) => {
    try {
      if (!req.body.password)
        return res.status(400).json({ error: "no password in body" });
      if (req.body.password == "this is not a password") {
        let crud = Crud<any>();
        crud
          .wipeDatabase()
          .then((data) => {
            return res.status(200).json(data);
          })
          .catch((err) => {
            return res.status(200).json(err);
          });
      } else {
        return res.status(400).json({ error: "invalid password" });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  });

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
