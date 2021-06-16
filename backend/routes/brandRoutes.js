import express from "express";
const router = express.Router();

// Bring in Models & Helpers
import {
  addBrand,
  brandList,
  fetchBrands,
  fetchBrand,
  brandListSelect,
  brandEdit,
  brandEditActive,
  brandDelete,
} from "../controllers/brandController.js";
import { protect } from "../middleware/authMiddleware.js";
import { role } from "../middleware/rolecheckMiddleware.js";

router.post("/add", protect, role.checkRole(role.ROLES.Admin), addBrand);

// fetch store brands api
router.get("/list", brandList);

// fetch brands api
router.get(
  "/",
  protect,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  fetchBrands
);

router.get("/:id", fetchBrand);

router.get(
  "/list/select",
  protect,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  brandListSelect
);

router.put(
  "/:id",
  protect,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  brandEdit
);

router.put(
  "/:id/active",
  protect,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  brandEditActive
);

router.delete(
  "/delete/:id",
  protect,
  role.checkRole(role.ROLES.Admin),
  brandDelete
);

export default router;
