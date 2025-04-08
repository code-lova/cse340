const utilities = require(".");
const { body, validationResult } = require("express-validator");
const invModel = require("../models/inventory-model");
const accountModel = require("../models/account-model");

const validate = {};

/*  **********************************
 *  Comment Data Validation Rules
 * ********************************* */
validate.commentRules = () => {
  return [
    // classification name validation (text only)
    body("comment_text")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid inventory comment"),
  ];
};

/* ******************************
 * Check data and return errors
 * ***************************** */
validate.checkCommentData = async (req, res, next) => {
  const { comment_text } = req.body;
  const invId = req.params.invId;
  const vehicle = await invModel.getVehicleById(invId);
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let account = null;

    if (res.locals.accountData) {
      const account_id = res.locals.accountData.account_id;
      account = await accountModel.getAccountById(account_id);
    }
    const vehicleDetails = await utilities.buildVehicleDetails(vehicle);
    res.render("./inventory/detail", {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      errors,
      nav,
      user: account,
      vehicleDetails,
      comment_text,
    });
    return;
  }
  next();
};

module.exports = validate;
