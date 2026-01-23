const express = require("express");
const router = express.Router();

const {
  createTemplate,
  getTemplates,
  getTemplateById,
} = require("../controllers/template.controller");

router.post("/", createTemplate);        // create template
router.get("/", getTemplates);            // get all templates
router.get("/:id", getTemplateById);      // get single template

module.exports = router;
