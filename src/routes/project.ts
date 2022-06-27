const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { Project } from "../api/project/project";

const project = Project();

router.get("/project", jsonParser, (req: any, res: any) => {
  try {
    project
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

router.get("/project=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ error: "invalid project id" });
    return project
      .findOne(req.params.id)
      .then((data) => {
        if (data == undefined) {
          return res.status(400).send({ error: "invalid project id" });
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
router.get("/projects=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ error: "invalid project id" });
    return project
      .findByUser(req.params.id)
      .then((data) => {
        if (data == undefined) {
          return res.status(400).send({ error: "invalid project id" });
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

router.post("/project", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.projectName)
      return res.status(400).send({ error: "invalid projectName" });
    if (!req.body.projectDate)
      return res.status(400).send({ error: "invalid projectDate" });
    if (!req.body.idUser)
      return res.status(400).send({ error: "invalid idUser" });
    return project
      .insert({
        projectName: req.body.projectName,
        projectDate: req.body.projectDate,
        idUser: req.body.idUser,
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

router.delete("/project=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("invalid id");
    return project
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

router.put("/project", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("invalid id");
    if (!req.body.projectName)
      return res.status(400).send({ error: "invalid projectName" });
    if (!req.body.projectDate)
      return res.status(400).send({ error: "invalid projectDate" });
    if (!req.body.idUser)
      return res.status(400).send({ error: "invalid idUser" });
    return project
      .update(req.body.id, {
        projectName: req.body.projectName,
        projectDate: req.body.projectDate,
        idUser: req.body.idUser,
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
