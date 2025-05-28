const express = require("express")
const services = require("../controllers/Service-controller")

const router = express.Router()


router.route("/service").get(services)

module.exports = router