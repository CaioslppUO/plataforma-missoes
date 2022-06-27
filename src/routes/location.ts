const express = require("express");
export const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

import { Location } from "../api/location/location";

const location = Location();

router.get("/location", jsonParser, (req: any, res: any) => {
  try {
    location
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

router.get("/location=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ error: "invalid location id" });
    return location
      .findOne(req.params.id)
      .then((data) => {
        if (data == undefined) {
          return res.status(400).send({ error: "invalid location id" });
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

router.get("/locations=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ error: "invalid mission id" });
    return location
      .findByMission(req.params.id)
      .then((data) => {
        if (data == undefined) {
          return res.status(400).send({ error: "invalid mission id" });
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

router.post("/location", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.latitude)
      return res.status(400).send({ error: "invalid latitude" });
    if (!req.body.longitude)
      return res.status(400).send({ error: "invalid longitude" });
    if (!req.body.locationOrder)
      return res.status(400).send({ error: "invalid locationOrder" });
    if (!req.body.idMission)
      return res.status(400).send({ error: "invalid idMission" });
    return location
      .insert({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        locationOrder: req.body.locationOrder,
        idMission: req.body.idMission,
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

router.delete("/location=:id", jsonParser, (req: any, res: any) => {
  try {
    if (!req.params.id) return res.status(400).send("invalid id");
    return location
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

router.put("/location", jsonParser, (req: any, res: any) => {
  try {
    if (!req.body.id) return res.status(400).send("invalid id");
    if (!req.body.latitude)
      return res.status(400).send({ error: "invalid latitude" });
    if (!req.body.longitude)
      return res.status(400).send({ error: "invalid longitude" });
    if (!req.body.locationOrder)
      return res.status(400).send({ error: "invalid locationOrder" });
    if (!req.body.idMission)
      return res.status(400).send({ error: "invalid idMission" });

    return location
      .update(req.body.id, {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        locationOrder: req.body.locationOrder,
        idMission: req.body.idMission,
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
