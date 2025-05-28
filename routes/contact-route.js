const express = require("express")
const validate = require("../middlewares/validate-middleware")
const contactSchema = require("../validators/contact-validator")
const contactForm = require("../controllers/contact-form")

const router = express.Router()


// contact router
router.route("/contact-us").post(validate(contactSchema), contactForm)
module.exports = router;
