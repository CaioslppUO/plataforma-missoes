const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { Action } from "../api/action/action";

const action = Action();

router.get("/action", jsonParser, (req: any, res: any) => {
  try {
    action
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

router.get("/action=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ error: "invalid action id" });
    return action
      .findOne(req.params.id)
      .then((data) => {
        if (data == undefined) {
          return res.status(400).send({ error: "invalid action id" });
        }
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/action", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.idActionType)
      return res.status(400).send({ error: "invalid idActionType" });
    if (!req.body.idLocation)
      return res.status(400).send({ error: "invalid idLocation" });
    return action
      .insert({
        idActionType: req.body.idActionType,
        idLocation: req.body.idLocation,
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

router.delete("/action=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("invalid id");
    return action
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

router.put("/action", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("invalid id");
    if (!req.body.idActionType)
      return res.status(400).send("invalid idActionType");
    if (!req.body.idLocation) return res.status(400).send("invalid idLocation");
    return action
      .update(req.body.id, {
        idActionType: req.body.idActionType,
        idLocation: req.body.idLocation,
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
