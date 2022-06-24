const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { ActionType } from "../api/actionType/actionType";

const actionType = ActionType();

router.get("/actionType", jsonParser, (req: any, res: any) => {
  try {
    actionType
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

router.get("/actionType=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ error: "invalid actionType id" });
    return actionType
      .findOne(req.params.id)
      .then((data) => {
        if (data == undefined) {
          return res.status(400).send({ error: "invalid actionType id" });
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

router.post("/actionType", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.actionName)
      return res.status(400).send({ error: "invalid actionName" });
    if (!req.body.actionDescription)
      return res.status(400).send({ error: "invalid actionDescription" });
    return actionType
      .insert({
        actionName: req.body.actionName,
        actionDescription: req.body.actionDescription,
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

router.delete("/actionType=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("invalid id");
    return actionType
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

router.put("/actionType", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("invalid id");
    if (!req.body.actionName) return res.status(400).send("invalid actionName");
    if (!req.body.actionDescription)
      return res.status(400).send("invalid actionDescription");
    return actionType
      .update(req.body.id, {
        actionName: req.body.actionName,
        actionDescription: req.body.actionDescription,
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
