const express = require("express");
const poses = express.Router();
const { checkName, checkWebsite, checkBoolean } = require("../validations/checkPoses");
const {
  getAllPoses,
  getPose,
  createPose,
  deletePose,
  updatePose
} = require("../queries/poses.js");

// INDEX
poses.get("/", async (req, res) => {
  const allPoses = await getAllPoses();
  if (allPoses[0]) {
    res.status(200).json(allPoses);
  }
  else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
poses.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pose = await getPose(id);
  if (pose) {
    res.json(pose);
  }
  else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
poses.post("/", checkName, checkWebsite, checkBoolean, async (req, res) => {
  try {
    const pose = await createPose(req.body);
    res.json(pose);
  }
  catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE
poses.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPose = await deletePose(id);
    if (deletedPose.id) {
      res.status(200).json(deletedPose);
    }
    else {
      res.status(404).json("Pose not found!");
    }
  }
  catch (error) {
    res.status(500).json({error: error})
  }
});

// UPDATE
poses.put("/:id", checkName, checkWebsite, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedPose = await updatePose(id, req.body);
  res.status(200).json(updatedPose);
});

module.exports = poses;
