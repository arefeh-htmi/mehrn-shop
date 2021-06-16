import express from "express";
const router = express.Router();
// Bring in Models & Helpers
import { protect } from "../middleware/authMiddleware.js";
import { role } from "../middleware/rolecheckMiddleware.js";
import {
  addCategory,
  categoryList,
  fetchCategories,
  fetchCategory,
  editCategory,
  editCategoryActiveId,
  deleteCategory,
} from "../controllers/categoryController.js";

router.post("/add", protect, role.checkRole(role.ROLES.Admin), addCategory);

// fetch store categories api
router.get("/list", categoryList);

// fetch categories api
router.get("/", fetchCategories);

// fetch category api
router.get("/:id", fetchCategory);

router.put("/:id", protect, role.checkRole(role.ROLES.Admin), editCategory);

router.put(
  "/:id/active",
  protect,
  role.checkRole(role.ROLES.Admin),
  editCategoryActiveId
);

router.delete(
  "/delete/:id",
  protect,
  role.checkRole(role.ROLES.Admin),
  deleteCategory
);

export default router;
