const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const { stripePaymentController } = require("../controllers/stripeController");

router.route("/").post(authenticateUser, stripePaymentController);

module.exports = router;
