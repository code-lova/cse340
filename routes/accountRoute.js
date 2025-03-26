// Import required modules
const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to serve login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Process the login attempt temporarly
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  (req, res) => {
    res.status(200).send("login process");
  }
);

// Route to build registration view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Add the registration POST route
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Export the router
module.exports = router;
