const express = require('express');
const { getAllProducts, createProduct, updateproduct, deleteProduct, getProductsDetails, createProductReview, getAdminProducts } = require('../controllers/productControllers');
const {isAuthenticatedUser,authorizeRole} = require('../middleware/auth')
const router= express.Router();

router.route("/products").get(getAllProducts)
router.route("/admin/products").get(isAuthenticatedUser, authorizeRole("admin"),getAdminProducts)
router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRole("admin"),createProduct)
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRole("admin"),updateproduct).delete(isAuthenticatedUser,authorizeRole("admin"),deleteProduct)
router.route("/products/:id").get(getProductsDetails)
router.route("/review").put(isAuthenticatedUser,createProductReview)

module.exports = router; 