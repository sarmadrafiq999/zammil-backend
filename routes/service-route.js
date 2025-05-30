const express = require("express");
const { getServices } = require("../controllers/Service-controller");

const router = express.Router();

router.route("/service").get(getServices);

module.exports = router;
