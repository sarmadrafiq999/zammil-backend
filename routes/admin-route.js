const express = require("express")
const authMiddleware = require("../middlewares/auth-middleware")
const { adminMiddleware } = require("../middlewares/admin-middleware")
const { postService, DeleteService, Getservices, EditService, SingleService, getContacts, DeleteContacts, getAllUsers, UpDateUser, Deleteuser, GetUserByID, GetontactByID, UpDateContact } = require("../controllers/admin-controllers")
const router = express.Router()

//! services Routes

router.route("/adminservices").post(authMiddleware, adminMiddleware, postService)
//----------------------
// Getting all services
//----------------------
router.route("/getadminservices").get(authMiddleware, adminMiddleware, Getservices)
router.route("/getadminservices/:id").get(authMiddleware, adminMiddleware, SingleService)
//----------------
// Update services
//----------------
router.route("/getadminservices/update/:id").patch(authMiddleware, adminMiddleware, EditService)
// Delete function
router.route("/adminservices/delete/:id").delete(authMiddleware, adminMiddleware, DeleteService)
//! Cotact Routes
// get contacts
router
    .route("/contacts").get(authMiddleware, adminMiddleware, getContacts)
// update
router
    .route("/contacts/update/:id").patch(authMiddleware, adminMiddleware, UpDateContact)

// delete contact
router
    .route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, DeleteContacts)
// single Contact
router
    .route("/contacts/:id").get(authMiddleware, adminMiddleware, GetontactByID)

//----------------
//! User Routes
//----------------
// get
router
    .route("/users").get(authMiddleware, adminMiddleware, getAllUsers)
// update
router
    .route("/users/update/:id").patch(authMiddleware, adminMiddleware, UpDateUser)
// Delete
router
    .route("/users/delete/:id").delete(authMiddleware, adminMiddleware, Deleteuser)
// Single user
router
    .route("/users/:id").get(authMiddleware, adminMiddleware, GetUserByID)
module.exports = router