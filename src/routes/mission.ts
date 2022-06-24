const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { Mission } from "../api/mission/mission";

const mission = Mission();

router.get("/mission", jsonParser, (req: any, res: any) => {
  try {
    mission
      .find()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/mission=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ error: "invalid mission id" });
    return mission
      .findOne(req.params.id)
      .then((data) => {
        if (data == undefined) {
          return res.status(400).send({ error: "invalid mission id" });
        }
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/mission", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.missionName)
      return res.status(400).send({ error: "invalid missionName" });
    if (!req.body.missionOrder)
      return res.status(400).send({ error: "invalid missionOrder" });
    if (!req.body.idProject)
      return res.status(400).send({ error: "invalid idProject" });
    return mission
      .insert({
        missionName: req.body.missionName,
        missionOrder: req.body.missionOrder,
        idProject: req.body.idProject,
      })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/mission=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("invalid id");
    return mission
      .remove(req.params.id)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.put("/mission", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("invalid id");
    if (!req.body.missionName)
      return res.status(400).send({ error: "invalid missionName" });
    if (!req.body.missionOrder)
      return res.status(400).send({ error: "invalid missionOrder" });
    if (!req.body.idProject)
      return res.status(400).send({ error: "invalid idProject" });
    return mission
      .update(req.body.id, {
        missionName: req.body.missionName,
        missionOrder: req.body.missionOrder,
        idProject: req.body.idProject,
      })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});
