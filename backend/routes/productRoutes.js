import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { role } from "../middleware/rolecheckMiddleware.js";

router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    createProduct
  );

router.route("/:id/reviews").post(protect, createProductReview);

router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(
    protect,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    deleteProduct
  )
  .put(
    protect,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    updateProduct
  );

export default router;
