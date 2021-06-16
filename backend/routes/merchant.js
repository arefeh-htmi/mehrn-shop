import express from "express";
const router = express.Router();
// Bring in Models & Helpers
import { protect } from "../middleware/authMiddleware.js";
import { role } from "../middleware/rolecheckMiddleware.js";

import {
  merchantRequestHandler,
  fetchAllMerchants,
  merchantApprovalHandler,
  merchantRejectHandler,
  merchantTokenSenderHandler,
  deleteMerchantHandler,
} from "../controllers/merchantController.js";

router.post("/seller-request", merchantRequestHandler);

// fetch all merchants api
router.get(
  "/list",
  protect,
  role.checkRole(role.ROLES.Admin),
  fetchAllMerchants
);

// approve merchant
router.put("/approve/:merchantId", protect, merchantApprovalHandler);

// reject merchant
router.put("/reject/:merchantId", protect, merchantRejectHandler);

router.post("/signup/:token", merchantTokenSenderHandler);

router.delete(
  "/delete/:id",
  protect,
  role.checkRole(role.ROLES.Admin),
  deleteMerchantHandler
);

export default router;
