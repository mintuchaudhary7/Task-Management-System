const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const { getAdminStats } = require("../controllers/admin.controller");

router.get("/stats", getAdminStats);

module.exports = router;
