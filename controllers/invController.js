const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ****************************************
 *  Deliver inventroty management view
 * *************************************** */

invCont.showManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Deliver classification view
 * *************************************** */
invCont.showAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Process Classification
 * *************************************** */
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;
  const data = await invModel.insertClassification(classification_name);
  if (data.rowCount > 0) {
    req.flash(
      "notice",
      `${classification_name} classification added successfully.`
    );
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Error adding classification.");
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    });
  }
};

/* ****************************************
 *  Deliver vehicle view
 * *************************************** */
invCont.showAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationList,
    errors: null,
  });
};

/* ****************************************
 *  Process Inventory
 * *************************************** */
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  const data = await invModel.insertInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  );
  if (data.rowCount > 0) {
    req.flash("notice", "Vehicle added successfully.");
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Error adding Vehicle.");
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
    });
  }
};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

// Build vehicle detail view
invCont.buildByInvId = async function (req, res, next) {
  const invId = req.params.invId;
  const vehicle = await invModel.getVehicleById(invId);
  let nav = await utilities.getNav();
  const vehicleDetails = await utilities.buildVehicleDetails(vehicle);
  res.render("./inventory/detail", {
    title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicleDetails,
  });
};

module.exports = invCont;
