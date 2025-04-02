// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/index");
const managementValidate = require("../utilities/management-validation");

// Task 1: Management View
router.get("/", utilities.handleErrors(invController.showManagementView));

// Task 2: Add Classification
router.get(
  "/add-classification",
  utilities.handleErrors(invController.showAddClassificationView)
);

router.post(
  "/add-classification",
  managementValidate.classificationRules(),
  managementValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Task 3: Add Inventory
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.showAddInventoryView)
);
router.post(
  "/add-inventory",
  managementValidate.inventoryRules(),
  managementValidate.checkInvData,
  utilities.handleErrors(invController.addInventory)
);

//Edit inventory route
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

// Edit vehicle inventory by id and show view
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventoryView)
);
// Update vehnicle inventory data
router.post(
  "/update",
  managementValidate.inventoryRules(),
  managementValidate.checkUpdateData,
  invController.updateInventory
);

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to get vehicle detalils by inventory Id
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByInvId)
);

module.exports = router;
