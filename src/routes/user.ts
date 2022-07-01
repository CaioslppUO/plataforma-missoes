const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { User } from "../api/user/user";

const user = User();

router.get("/user", jsonParser, (req: any, res: any) => {
  try {
    user
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

router.get("/user=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ error: "invalid user id" });
    return user
      .findOne(req.params.id)
      .then((data) => {
        if (data == undefined)
          return res.status(400).send({ error: "invalid user id" });
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/user", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.name) return res.status(400).send({ error: "invalid name" });
    if (!req.body.email)
      return res.status(400).send({ error: "invalid email" });
    if (!req.body.firebaseId)
      return res.status(400).send({ error: "invalid firebaseId" });
    return user
      .insert(req.body.name, req.body.email, req.body.firebaseId)
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

router.delete("/user=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("invalid id");
    return user
      .remove(req.params.id)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log("Caiu aqui");
        console.log(err);
        return res.status(400).send(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.put("/user", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("invalid id");
    if (!req.body.name) return res.status(400).send("invalid name");
    if (!req.body.email) return res.status(400).send("invalid email");
    if (!req.body.firebaseId)
      return res.status(400).send({ error: "invalid firebaseId" });
    return user
      .update(req.body.id, {
        userName: req.body.name,
        email: req.body.email,
        firebaseId: req.body.firebaseId,
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
