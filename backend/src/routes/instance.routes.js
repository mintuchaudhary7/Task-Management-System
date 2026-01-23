const express = require("express");
const router = express.Router();

const {
  createInstance,
  getAllInstances,
  getInstanceById
} = require("../controllers/instance.controller");

router.post("/", createInstance);
router.get("/", getAllInstances);
router.get("/:id", getInstanceById)

module.exports = router;
