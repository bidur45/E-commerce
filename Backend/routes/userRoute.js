const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUser, getSingleUserDetails,updateUserRole, deleteUser } = require("../controllers/userControllers");
const {isAuthenticatedUser,authorizeRole} = require('../middleware/auth')

const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logoutUser)

// router.route("/forgot/password").post(forgotPassword)

// router.route("/reset/password/token").put(resetPassword)

router.route("/self").get(isAuthenticatedUser,getUserDetails)

router.route("/changePassword").put(isAuthenticatedUser,updateUserPassword)

router.route("/changeProfile").put(isAuthenticatedUser,updateUserProfile)


router.route("/admin/users").get(isAuthenticatedUser,authorizeRole('admin'),getAllUser)

router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRole('admin'),getSingleUserDetails).put(isAuthenticatedUser,authorizeRole("admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRole("admin"),deleteUser)




module.exports = router