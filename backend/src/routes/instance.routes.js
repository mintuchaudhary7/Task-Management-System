const express = require("express");
const router = express.Router();

const {
  createInstance,
  getAllInstances,
  getInstanceById,
  getUsersInstance,
} = require("../controllers/instance.controller");

const auth = require("../middlewares/auth");

router.post("/", auth, createInstance);
router.get("/my-instances", auth, getUsersInstance);
router.get("/", auth, getAllInstances);
router.get("/:id", auth, getInstanceById);

module.exports = router;
