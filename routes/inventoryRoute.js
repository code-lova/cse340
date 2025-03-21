// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/index");


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to get vehicle detalils by inventory Id
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

module.exports = router;
